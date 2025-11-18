import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { put } from '@vercel/blob';

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;
const hasBlobToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = String(formData.get('name') || '');
    const email = String(formData.get('email') || '');
    const phone = String(formData.get('phone') || '');
    const contactPref = String(formData.get('contactPref') || 'email');
    const notes = String(formData.get('notes') || '');
    const consent = formData.get('consent');
    const lang = String(formData.get('lang') || 'en');
    const hairstyleId = String(formData.get('hairstyleId') || '');
    const answersRaw = String(formData.get('answers') || '{}');
    const preferredTimes = String(formData.get('slots') || '');

    if (!name || !email || !consent) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }

    console.log('New quote request from', name, email);

    let answers: unknown;
    try {
      answers = JSON.parse(answersRaw);
    } catch {
      answers = answersRaw;
    }

    const photos = formData.getAll('photos') as File[];
    const photoLinks: string[] = [];

    if (!hasBlobToken && photos.length) {
      console.warn('BLOB_READ_WRITE_TOKEN not set; skipping photo uploads for quote request');
    }

    for (const file of photos.slice(0, 3)) {
      if (!file) continue;
      if (file.size > 10 * 1024 * 1024) {
        continue;
      }
      if (!hasBlobToken) continue;
      try {
        const arrayBuffer = await file.arrayBuffer();
        const blob = await put(
          `quotes/${Date.now()}-${file.name}`,
          new Uint8Array(arrayBuffer),
          { access: 'public' }
        );
        photoLinks.push(blob.url);
      } catch (uploadErr) {
        console.error('Failed to upload quote photo', uploadErr);
      }
    }

    const prettyAnswers =
      typeof answers === 'string'
        ? answers
        : JSON.stringify(answers, null, 2);

    const subject =
      lang === 'en'
        ? `New hair quote request from ${name}`
        : `Nueva solicitud de cotización de ${name}`;

    const bodyLines = [
      `Name / Nombre: ${name}`,
      `Email: ${email}`,
      `Phone / Teléfono: ${phone || 'N/A'}`,
      `Preferred contact / Preferencia de contacto: ${contactPref}`,
      `Language / Idioma: ${lang}`,
      `Selected hairstyle id: ${hairstyleId || 'N/A'}`,
      '',
      'Quiz answers / Respuestas del cuestionario:',
      prettyAnswers,
      '',
      'Client notes / Notas de la clienta:',
      notes || '(none)',
      '',
      'Preferred days / times / Días y horarios preferidos:',
      preferredTimes || '(not specified)',
      '',
      'Photo links / Enlaces a fotos:',
      photoLinks.length ? photoLinks.join('\n') : '(no photos uploaded)',
    ];

    if (resend) {
      await resend.emails.send({
        from: 'Jaels Beauty Salon <quotes@jaelsbeauty.com>',
        to: ['jaels3beautysalon@gmail.com'],
        subject,
        text: bodyLines.join('\n'),
      });
    } else {
      console.warn('RESEND_API_KEY is not set – skipping email send for quote request');
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('Quote request failed', err);
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 });
  }
}
