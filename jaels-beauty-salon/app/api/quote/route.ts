import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { encodeApprovalPayload } from '@/lib/approvalPayload';

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

export const runtime = 'nodejs';

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
    const slotsText = String(formData.get('slots') || '');

    if (!name || !email || !consent) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }

    let answers: unknown;
    try {
      answers = JSON.parse(answersRaw);
    } catch {
      answers = answersRaw;
    }

    const photoFiles = formData.getAll('photos') as File[];
    const attachments = await Promise.all(
      photoFiles.slice(0, 3).map(async (file, idx) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return {
          filename: file.name || `photo-${idx + 1}.jpg`,
          content: buffer.toString('base64'),
          contentType: file.type || 'image/jpeg',
        };
      })
    );

    const approvalPayload = {
      name,
      email,
      phone,
      lang,
      slotsText,
      type: 'hair_consult',
      notes,
      hairstyleId,
    };

    let approveUrl: string | null = null;
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://gulfcoastjaelsbeautysalon.com';
      const encoded = encodeApprovalPayload(approvalPayload);
      approveUrl = `${baseUrl}/api/admin/approve-quote?payload=${encoded}`;
    } catch (err) {
      console.error('Failed to encode approval payload', err);
    }

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
      typeof answers === 'string' ? answers : JSON.stringify(answers, null, 2),
      '',
      'Client notes / Notas de la clienta:',
      notes || '(none)',
      '',
      'Preferred days / times / Días y horarios preferidos:',
      slotsText || '(not specified)',
    ];

    if (approveUrl) {
      bodyLines.push('', 'Approve hair consultation:', approveUrl);
    }

    if (resend && process.env.QUOTE_INBOX_EMAIL) {
      await resend.emails.send({
        from: 'Jael’s Beauty Salon <quotes@gulfcoastjaelsbeautysalon.com>',
        to: [process.env.QUOTE_INBOX_EMAIL],
        subject,
        text: bodyLines.join('\n'),
        attachments,
      });
    } else if (!process.env.QUOTE_INBOX_EMAIL) {
      console.error('QUOTE_INBOX_EMAIL not set');
    } else {
      console.warn('RESEND_API_KEY is not set – skipping email send for quote request');
    }

    // Optional client confirmation
    if (resend && email) {
      const clientSubject =
        lang === 'en'
          ? 'We received your quote request at Jael’s Beauty Salon'
          : 'Recibimos tu solicitud de cotización en Jael’s Beauty Salon';
      const clientBody =
        lang === 'en'
          ? 'Thank you for sharing your vision. We will review your photos and preferences and follow up with a personalized quote soon.'
          : 'Gracias por compartir tu visión. Revisaremos tus fotos y preferencias y te responderemos pronto con una cotización personalizada.';
      await resend.emails.send({
        from: 'Jael’s Beauty Salon <quotes@gulfcoastjaelsbeautysalon.com>',
        to: [email],
        subject: clientSubject,
        text: clientBody,
      });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('Quote request failed', err);
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 });
  }
}
