import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { put } from '@vercel/blob';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    if (!name || !email || !consent) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let answers: unknown;
    try {
      answers = JSON.parse(answersRaw);
    } catch {
      answers = answersRaw;
    }

    const photos = formData.getAll('photos') as File[];
    const photoLinks: string[] = [];

    for (const file of photos.slice(0, 3)) {
      if (!file) continue;
      if (file.size > 10 * 1024 * 1024) {
        continue;
      }
      const arrayBuffer = await file.arrayBuffer();
      const blob = await put(`quotes/${Date.now()}-${file.name}`, new Uint8Array(arrayBuffer), {
        access: 'public',
      });
      photoLinks.push(blob.url);
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
      'Photo links / Enlaces a fotos:',
      photoLinks.length ? photoLinks.join('\n') : '(no photos uploaded)',
    ];

    await resend.emails.send({
      from: 'Jaels Beauty Salon <quotes@jaelsbeauty.com>',
      to: ['jaels3beautysalon@gmail.com'],
      subject,
      text: bodyLines.join('\n'),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
