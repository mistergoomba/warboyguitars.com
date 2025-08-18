import { Resend } from 'resend';
export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, body } = await req.json();

    const { error } = await resend.emails.send({
      from: 'Warboy Guitars <contact@warboyguitars.com>',
      to: 'mistergoomba@gmail.com', //['s.tchavez@yahoo.com', 'r.rampy@outlook.com'],
      replyTo: email,
      subject: 'WARBOY GUITARS Contact Form',
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${body.replace(/\n/g, '<br/>')}</p>
      `,
    });

    if (error) return new Response(JSON.stringify({ ok: false }), { status: 500 });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}
