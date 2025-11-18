import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

type IncomingCustomer = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  hairGoals?: string;
};

function normalizePhone(phone?: string): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, '');
  if (!digits) return undefined;
  if (digits.length === 11 && digits.startsWith('1')) {
    return '+' + digits;
  }
  if (digits.length === 10) {
    return '+1' + digits;
  }
  return phone;
}

/**
 * Syncs onboarding contact details into Square Customers.
 */
export async function POST(req: NextRequest) {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  if (!token) {
    console.error('SQUARE_ACCESS_TOKEN is not set');
    return NextResponse.json({ ok: false, error: 'Server misconfigured' }, { status: 500 });
  }

  let body: IncomingCustomer;
  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const normalizedPhone = normalizePhone(body.phone);

  const payload = {
    given_name: body.firstName || undefined,
    family_name: body.lastName || undefined,
    email_address: body.email || undefined,
    phone_number: normalizedPhone || body.phone || undefined,
    note: body.hairGoals || undefined,
  };

  try {
    let existingCustomerId: string | null = null;

    if (normalizedPhone || body.email) {
      const searchQuery: any = {
        query: {
          filter: {},
        },
      };

      if (normalizedPhone) {
        searchQuery.query.filter.phone_number = { exact: normalizedPhone };
      }

      if (body.email) {
        searchQuery.query.filter.email_address = { exact: body.email };
      }

      try {
        const searchRes = await fetch('https://connect.squareup.com/v2/customers/search', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(searchQuery),
        });

        const searchData = await searchRes.json().catch(() => null);

        if (searchRes.ok && Array.isArray(searchData?.customers) && searchData.customers.length > 0) {
          existingCustomerId = searchData.customers[0].id;
        } else if (!searchRes.ok) {
          console.error('Square customer search failed', searchRes.status, searchData);
        }
      } catch (err) {
        console.error('Square customer search request error', err);
      }
    }

    let squareResponse: Response | undefined;
    let squareData: any;

    if (existingCustomerId) {
      try {
        const updateRes = await fetch(`https://connect.squareup.com/v2/customers/${existingCustomerId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });

        squareData = await updateRes.json().catch(() => null);
        squareResponse = updateRes;

        if (!updateRes.ok) {
          console.error('Square update customer failed', updateRes.status, squareData);
        }
      } catch (err) {
        console.error('Square update customer request error', err);
      }
    } else {
      try {
        const createRes = await fetch('https://connect.squareup.com/v2/customers', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            idempotency_key: randomUUID(),
            ...payload,
          }),
        });

        squareData = await createRes.json().catch(() => null);
        squareResponse = createRes;

        if (!createRes.ok) {
          console.error('Square create customer failed', createRes.status, squareData);
        }
      } catch (err) {
        console.error('Square create customer request error', err);
      }
    }

    if (squareResponse?.ok) {
      return NextResponse.json(
        { ok: true, customerId: squareData?.customer?.id ?? existingCustomerId ?? null },
        { status: 200 }
      );
    }

    return NextResponse.json({ ok: false, error: 'Square customer sync failed' }, { status: 500 });
  } catch (err) {
    console.error('Square customer request error', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
