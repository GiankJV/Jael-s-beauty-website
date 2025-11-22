import { NextRequest, NextResponse } from 'next/server';
import { decodeApprovalPayload } from '@/lib/approvalPayload';
import { randomUUID } from 'crypto';
import type { QuoteApprovalPayload } from '@/types/quoteApproval';

const { SQUARE_ACCESS_TOKEN, SQUARE_LOCATION_ID, SQUARE_HAIR_CONSULT_SERVICE_ID } = process.env;

function normalizePhone(phone?: string): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, '');
  if (!digits) return undefined;
  if (digits.length === 11 && digits.startsWith('1')) return '+' + digits;
  if (digits.length === 10) return '+1' + digits;
  return phone;
}

function html(message: string, status = 200) {
  return new NextResponse(message, { status, headers: { 'Content-Type': 'text/html' } });
}

export async function GET(req: NextRequest) {
  const payloadParam = req.nextUrl.searchParams.get('payload');
  if (!payloadParam) {
    return html('<h1>Missing approval payload.</h1>', 400);
  }
  const data = decodeApprovalPayload(payloadParam) as QuoteApprovalPayload | null;
  if (!data) {
    return html('<h1>Invalid or expired approval link.</h1>', 400);
  }

  if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID) {
    console.error('Missing Square env vars');
    return html('<h1>Server misconfigured for Square booking.</h1>', 500);
  }

  const SERVICE_ID_BY_HAIRSTYLE: Record<string, string | undefined> = {
    'lived-in-blonde': process.env.SQUARE_SERVICE_LIVED_IN_BLONDE_ID,
    'dimensional-brunette': process.env.SQUARE_SERVICE_DIMENSIONAL_BRUNETTE_ID,
    'vivid-fashion-color': process.env.SQUARE_SERVICE_VIVID_COLOR_ID,
    'grey-blend': process.env.SQUARE_SERVICE_GREY_BLENDING_ID,
    'precision-cut': process.env.SQUARE_SERVICE_PRECISION_HAIRCUT_ID,
    'repair-treatment': process.env.SQUARE_SERVICE_REPAIR_TREATMENT_ID,
    'texture-perm': process.env.SQUARE_SERVICE_TEXTURE_PERM_ID,
  };

  const serviceVariationId =
    data.serviceVariationId ||
    (data.hairstyleId && SERVICE_ID_BY_HAIRSTYLE[data.hairstyleId]) ||
    SQUARE_HAIR_CONSULT_SERVICE_ID;

  if (!serviceVariationId) {
    console.error('Missing Square service variation ID for hairstyle', data.hairstyleId);
    return html('<h1>Service mapping missing for this hairstyle. Please configure Square IDs.</h1>', 500);
  }

  const normalizedPhone = normalizePhone(data.phone);

  // Search for customer
  let customerId: string | undefined;
  if (normalizedPhone || data.email) {
    const searchQuery: any = { query: { filter: {} } };
    if (normalizedPhone) searchQuery.query.filter.phone_number = { exact: normalizedPhone };
    if (data.email) searchQuery.query.filter.email_address = { exact: data.email };

    try {
      const searchRes = await fetch('https://connect.squareup.com/v2/customers/search', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(searchQuery),
      });
      const searchData = await searchRes.json().catch(() => null);
      if (searchRes.ok && Array.isArray(searchData?.customers) && searchData.customers.length > 0) {
        customerId = searchData.customers[0].id as string;
      }
    } catch (err) {
      console.error('Square customer search failed', err);
    }
  }

  // Create customer if not found
  if (!customerId) {
    try {
      const createRes = await fetch('https://connect.squareup.com/v2/customers', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          idempotency_key: randomUUID(),
          given_name: data.name,
          email_address: data.email,
          phone_number: normalizedPhone || data.phone || undefined,
          note: data.notes || undefined,
        }),
      });
      const createData = await createRes.json().catch(() => null);
      if (createRes.ok) {
        customerId = createData?.customer?.id as string | undefined;
      } else {
        console.error('Square create customer failed', createRes.status, createData);
      }
    } catch (err) {
      console.error('Square create customer request error', err);
    }
  }

  if (!customerId) {
    return html(
      '<h1>Approval noted</h1><p>Could not find or create the customer in Square. Please create the appointment manually.</p>',
      200
    );
  }

  // Pick start time from approved slot if available, else fallback to parsed slotsText or default time.
  const fallback = new Date();
  fallback.setDate(fallback.getDate() + 7);
  fallback.setHours(15, 0, 0, 0); // 10am CT ~ 15:00 UTC
  let startAt = fallback.toISOString();

  if (data.slot?.startAt) {
    const parsedSlot = new Date(data.slot.startAt);
    if (!isNaN(parsedSlot.getTime())) {
      startAt = parsedSlot.toISOString();
    }
  } else if (typeof data.slotsText === 'string') {
    const lines = data.slotsText.split('\n').map((l: string) => l.trim()).filter(Boolean);
    for (const line of lines) {
      const cleaned = line.replace(/Slot \\d:\\s*/i, '');
      const parsed = new Date(cleaned);
      if (!isNaN(parsed.getTime())) {
        startAt = parsed.toISOString();
        break;
      }
    }
  }

  let bookingId: string | undefined;
  try {
    const durationMinutes = 30;
    const serviceVariationVersion = 1763518047249;
    const appointmentSegment = {
      duration_minutes: durationMinutes,
      service_variation_id: serviceVariationId,
      service_variation_version: serviceVariationVersion,
      team_member_id: 'TMNhiEc9dMeUyW1d',
    };

    const bookingPayload = {
      idempotency_key: randomUUID(),
      booking: {
        customer_id: customerId,
        location_id: SQUARE_LOCATION_ID!,
        start_at: startAt,
        appointment_segments: [appointmentSegment],
      },
    };

    const bookingRes = await fetch('https://connect.squareup.com/v2/bookings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(bookingPayload),
    });
    const bookingData = await bookingRes.json().catch(() => null);
    if (bookingRes.ok) {
      bookingId = bookingData?.booking?.id as string | undefined;
    } else {
      console.error('Square booking failed', bookingRes.status, bookingData);
    }
  } catch (err) {
    console.error('Square booking error', err);
  }

  if (!bookingId) {
    return html(
      '<h1>Approval noted</h1><p>Could not create the Square booking automatically. Please schedule manually in Square.</p>',
      200
    );
  }

  return html(
    `<h1>Appointment created</h1><p>Created a hair consultation in Square for ${data.name}. Please review the time in Square and adjust if needed.</p>`,
    200
  );
}
