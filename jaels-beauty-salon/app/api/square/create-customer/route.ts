import { NextRequest, NextResponse } from 'next/server';

type IncomingCustomer = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  hairGoals?: string;
};

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

  const payload = {
    idempotency_key: crypto.randomUUID(),
    given_name: body.firstName || undefined,
    family_name: body.lastName || undefined,
    email_address: body.email || undefined,
    phone_number: body.phone || undefined,
    note: body.hairGoals || undefined,
  };

  try {
    const res = await fetch('https://connect.squareup.com/v2/customers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error('Square create customer failed', res.status, data);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true, customerId: data?.customer?.id });
  } catch (err) {
    console.error('Square customer request error', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
