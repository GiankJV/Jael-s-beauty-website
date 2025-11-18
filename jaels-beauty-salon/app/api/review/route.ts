import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

type ReviewBody = {
  name?: string;
  serviceType?: string;
  rating?: number | string;
  message?: string;
  permissionToPublish?: boolean;
  lang?: 'en' | 'es';
  source?: string | null;
};

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

export async function POST(req: NextRequest) {
  if (!resend || !process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set; cannot send review emails');
    return NextResponse.json({ ok: false, error: 'Server misconfigured' }, { status: 500 });
  }

  try {
    const body = (await req.json()) as ReviewBody;
    const { name, serviceType, message, permissionToPublish, source, lang } = body;
    const rating = typeof body.rating === 'string' ? Number(body.rating) : body.rating;

    if (!name || !serviceType || !rating || !message) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }

    const subject = `New Review from ${name} (${serviceType}, ${rating}/5)`;
    const timestamp = new Date().toISOString();
    const lines = [
      `Name: ${name}`,
      `Service: ${serviceType}`,
      `Rating: ${rating}/5`,
      `Permission to publish: ${permissionToPublish ? 'Yes' : 'No'}`,
      `Language: ${lang || 'unknown'}`,
      `Source: ${source || 'direct'}`,
      `Timestamp: ${timestamp}`,
      '',
      'Message:',
      message,
    ];

    await resend.emails.send({
      from: 'Jaels Beauty Salon <quotes@jaelsbeauty.com>',
      to: ['jaels3beautysalon@gmail.com'],
      subject,
      text: lines.join('\n'),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('Review submission failed', err);
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 });
  }
}

