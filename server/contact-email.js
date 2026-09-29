import nodemailer from 'nodemailer';

export function createContactNotifier({ env = process.env, createTransport = nodemailer.createTransport } = {}) {
  const user = env.SMTP_USER?.trim();
  const pass = env.SMTP_PASS?.replace(/\s/g, '');
  const recipient = env.CONTACT_NOTIFICATION_TO?.trim();
  if (!user || !pass || !recipient) return null;

  const transport = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
    tls: { rejectUnauthorized: true, minVersion: 'TLSv1.2' },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });

  return async (row) => {
    const result = await transport.sendMail({
      from: { name: 'Pintu Portfolio', address: user },
      to: recipient,
      replyTo: { name: row.name, address: row.email },
      subject: `[Portfolio] ${row.subject || 'New contact message'}`,
      text: `New portfolio contact message\n\nName: ${row.name}\nEmail: ${row.email}\nSubject: ${row.subject || '(none)'}\n\n${row.message}\n\nThis message is also saved in your portfolio database.`,
    });
    if (!result.accepted?.some(address => address.toLowerCase() === recipient.toLowerCase())) {
      throw new Error('Notification recipient was not accepted');
    }
  };
}
