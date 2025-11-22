import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { encodeApprovalPayload } from '@/lib/approvalPayload';
import type { QuoteApprovalPayload, QuoteApprovalSlot } from '@/types/quoteApproval';

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;
const quoteInboxEmail = process.env.QUOTE_INBOX_EMAIL;

const SERVICE_ID_BY_HAIRSTYLE: Record<string, string | undefined> = {
  'lived-in-blonde': process.env.SQUARE_SERVICE_LIVED_IN_BLONDE_ID,
  'dimensional-brunette': process.env.SQUARE_SERVICE_DIMENSIONAL_BRUNETTE_ID,
  'vivid-fashion-color': process.env.SQUARE_SERVICE_VIVID_COLOR_ID,
  'grey-blend': process.env.SQUARE_SERVICE_GREY_BLENDING_ID,
  'precision-cut': process.env.SQUARE_SERVICE_PRECISION_HAIRCUT_ID,
  'repair-treatment': process.env.SQUARE_SERVICE_REPAIR_TREATMENT_ID,
  'texture-perm': process.env.SQUARE_SERVICE_TEXTURE_PERM_ID,
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function parseSlotFromFormData(formData: FormData, index: number): QuoteApprovalSlot | null {
  const rawLabel = formData.get(`slot${index}Label`);
  const rawStartAt = formData.get(`slot${index}StartAt`) ?? formData.get(`slot${index}Iso`);
  const startAt = typeof rawStartAt === 'string' ? rawStartAt : '';
  if (!startAt) return null;
  const label =
    typeof rawLabel === 'string' && rawLabel.trim()
      ? rawLabel.trim()
      : `Preferred slot ${index}`;
  return { label, startAt };
}

function parseSlotsFromText(slotsText: string): QuoteApprovalSlot[] {
  if (!slotsText) return [];
  return slotsText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const cleaned = line.replace(/Slot \d:\s*/i, '');
      const parsed = new Date(cleaned);
      if (isNaN(parsed.getTime())) return null;
      return { label: line, startAt: parsed.toISOString() };
    })
    .filter((slot): slot is QuoteApprovalSlot => Boolean(slot?.startAt));
}

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

    const structuredSlots: QuoteApprovalSlot[] = [];
    for (let i = 1; i <= 3; i += 1) {
      const slot = parseSlotFromFormData(formData, i);
      if (slot) structuredSlots.push(slot);
    }
    const fallbackSlots = structuredSlots.length === 0 ? parseSlotsFromText(slotsText) : [];
    const slots = (structuredSlots.length > 0 ? structuredSlots : fallbackSlots).filter((slot) => !!slot.startAt);

    const serviceVariationId =
      (hairstyleId && SERVICE_ID_BY_HAIRSTYLE[hairstyleId]) || process.env.SQUARE_HAIR_CONSULT_SERVICE_ID;

    type ApprovalLink = { index: number; label: string; approveUrl: string };
    let approvalLinks: ApprovalLink[] = [];
    if (slots.length > 0) {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://gulfcoastjaelsbeautysalon.com';
        const commonFields: Omit<QuoteApprovalPayload, 'slot'> = {
          name,
          email,
          phone,
          lang,
          slotsText: slotsText || undefined,
          type: 'hair_consult',
          notes,
          hairstyleId,
          serviceVariationId,
        };
        approvalLinks = slots.map((slot, index) => {
          const payload: QuoteApprovalPayload = { ...commonFields, slot };
          const encoded = encodeApprovalPayload(payload);
          return {
            index: index + 1,
            label: slot.label,
            approveUrl: `${baseUrl}/api/admin/approve-quote?payload=${encoded}`,
          };
        });
      } catch (err) {
        console.error('Failed to encode approval payload', err);
      }
    }

    const subject =
      lang === 'en'
        ? `New hair quote request from ${name}`
        : `Nueva solicitud de cotización de ${name}`;

    const answersDisplay = typeof answers === 'string' ? answers : JSON.stringify(answers, null, 2);
    const textLines = [
      `Name / Nombre: ${name}`,
      `Email: ${email}`,
      `Phone / Teléfono: ${phone || 'N/A'}`,
      `Preferred contact / Preferencia de contacto: ${contactPref}`,
      `Language / Idioma: ${lang}`,
      `Selected hairstyle id: ${hairstyleId || 'N/A'}`,
      '',
      'Quiz answers / Respuestas del cuestionario:',
      answersDisplay || '(none)',
      '',
      'Client notes / Notas de la clienta:',
      notes || '(none)',
      '',
      'Preferred days / times / Días y horarios preferidos:',
    ];

    if (approvalLinks.length > 0) {
      textLines.push(...approvalLinks.map((link) => `- ${link.label}: ${link.approveUrl}`));
    } else {
      textLines.push(slotsText || '(not specified)');
    }

    const htmlApprovalList =
      approvalLinks.length > 0
        ? approvalLinks
            .map(
              (link) => `
        <li style="margin-bottom: 16px;">
          <div>${escapeHtml(link.label)}</div>
          <a
            href="${link.approveUrl}"
            style="
              display:inline-block;
              margin-top:8px;
              padding:8px 14px;
              border-radius:999px;
              background-color:#d5a4a0;
              color:#ffffff;
              text-decoration:none;
              font-size:14px;
            "
          >
            Approve this time
          </a>
        </li>
      `
            )
            .join('')
        : `<li style="margin-bottom: 16px;">${escapeHtml(slotsText || 'No preferred slots provided')}</li>`;

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.5; color: #1f2933;">
        <h2 style="font-size: 20px; margin-bottom: 16px;">New hair consultation request</h2>
        
        <p><strong>Name / Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone / Teléfono:</strong> ${escapeHtml(phone || 'N/A')}</p>
        <p><strong>Preferred contact / Preferencia de contacto:</strong> ${escapeHtml(contactPref)}</p>
        <p><strong>Language / Idioma:</strong> ${escapeHtml(lang)}</p>
        <p><strong>Selected hairstyle id:</strong> ${escapeHtml(hairstyleId || 'N/A')}</p>
        
        <h3 style="margin-top: 24px; font-size: 16px;">Preferred days / times / Días y horarios preferidos</h3>
        <ul style="padding-left: 0; list-style: none; margin: 0;">
          ${htmlApprovalList}
        </ul>

        <h3 style="margin-top: 24px; font-size: 16px;">Quiz answers / Respuestas del cuestionario</h3>
        <pre style="background-color:#f5f5f5; padding:12px; border-radius:8px; white-space:pre-wrap;">${escapeHtml(
          answersDisplay || '(none)'
        )}</pre>

        <h3 style="margin-top: 24px; font-size: 16px;">Client notes / Notas de la clienta</h3>
        <p>${escapeHtml(notes || '(none)')}</p>
      </div>
    `;

    if (resend && quoteInboxEmail) {
      await resend.emails.send({
        from: 'Jael’s Beauty Salon <quotes@gulfcoastjaelsbeautysalon.com>',
        to: [quoteInboxEmail],
        subject,
        html,
        text: textLines.join('\n'),
        attachments,
      });
    } else if (!quoteInboxEmail) {
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
    console.error('[/api/quote] error', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
