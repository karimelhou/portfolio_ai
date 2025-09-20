import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { contactSchema } from '@/lib/validation/contact';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
    }

    const { name, email, message, locale } = result.data;

    if (process.env.MAIL_HOST) {
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT || 587),
        secure: false,
        auth: process.env.MAIL_USER
          ? {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS
            }
          : undefined
      });
      await transporter.sendMail({
        from: 'portfolio@karimelhoumaini.dev',
        to: process.env.CONTACT_EMAIL || 'elhoumaini.ka@gmail.com',
        subject: `New portfolio message (${locale})`,
        text: `From: ${name} <${email}>\n\n${message}`
      });
    } else {
      console.info('[contact:stub]', { name, email, message, locale });
    }

    return NextResponse.json({ message: 'Message received. Karim will reply shortly!' });
  } catch (error) {
    console.error('[contact:error]', error);
    return NextResponse.json({ message: 'Unable to send the message right now.' }, { status: 500 });
  }
}
