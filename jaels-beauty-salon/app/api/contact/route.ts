import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/**
 * API endpoint to handle contact form submissions. Expects a POST request
 * with a JSON body containing `name`, `email` and `message` fields. Sends
 * an email via Resend to the salon inbox. Requires the `RESEND_API_KEY`
 * environment variable to be set.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, message } = data;
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    // Basic email validation on the server
    const emailPattern = /.+@.+\..+/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY as string);
    await resend.emails.send({
      from: "Jael's Beauty Salon <no-reply@jaelsbeautysalon.com>",
      to: ['jaels3beautysalon@gmail.com'],
      subject: 'New website contact form submission',
      replyTo: email,
      text: `You have received a new message from ${name} (${email}).\n\n${message}`,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}