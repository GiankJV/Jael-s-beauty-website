import crypto from 'crypto';

const APPROVE_SECRET = process.env.APPROVE_SECRET;

export function encodeApprovalPayload(payload: unknown): string {
  if (!APPROVE_SECRET) throw new Error('APPROVE_SECRET not set');
  const json = JSON.stringify(payload);
  const hmac = crypto.createHmac('sha256', APPROVE_SECRET);
  hmac.update(json);
  const sig = hmac.digest('hex');
  const packed = JSON.stringify({ d: json, s: sig });
  return Buffer.from(packed).toString('base64url');
}

export function decodeApprovalPayload(encoded: string): any | null {
  if (!APPROVE_SECRET) return null;
  try {
    const packed = Buffer.from(encoded, 'base64url').toString('utf8');
    const { d, s } = JSON.parse(packed) as { d: string; s: string };
    const hmac = crypto.createHmac('sha256', APPROVE_SECRET);
    hmac.update(d);
    const expected = hmac.digest('hex');
    if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(s))) {
      return null;
    }
    return JSON.parse(d);
  } catch {
    return null;
  }
}
