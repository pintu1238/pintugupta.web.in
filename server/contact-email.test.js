// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { createContactNotifier } from './contact-email.js';

const env = {
  SMTP_USER: 'sender@gmail.com',
  SMTP_PASS: 'abcd efgh ijkl mnop',
  CONTACT_NOTIFICATION_TO: 'owner@example.com',
};
const row = { name: 'Asha', email: 'asha@example.com', subject: 'Website project', message: 'Can we discuss my project?' };

describe('contact email notification', () => {
  it('uses authenticated TLS Gmail and a fixed recipient with the visitor as reply-to', async () => {
    let options;
    let mail;
    const notify = createContactNotifier({ env, createTransport: (config) => {
      options = config;
      return { sendMail: async (message) => { mail = message; return { accepted: ['owner@example.com'] }; } };
    } });
    await notify({ ...row, to: 'attacker@example.com', from: 'spoof@example.com' });
    expect(options).toMatchObject({ host: 'smtp.gmail.com', port: 465, secure: true, auth: { user: 'sender@gmail.com', pass: 'abcdefghijklmnop' }, tls: { rejectUnauthorized: true } });
    expect(mail.from).toEqual({ name: 'Pintu Portfolio', address: 'sender@gmail.com' });
    expect(mail.to).toBe('owner@example.com');
    expect(mail.replyTo).toEqual({ name: 'Asha', address: 'asha@example.com' });
    expect(mail.subject).toBe('[Portfolio] Website project');
    expect(mail.text).toContain('Can we discuss my project?');
    expect(mail.text).toContain('asha@example.com');
    expect(mail.html).toBeUndefined();
  });

  it('does not initialize SMTP if credentials are absent', () => {
    expect(createContactNotifier({ env: {}, createTransport: () => { throw new Error('unexpected SMTP'); } })).toBeNull();
  });

  it('rejects recipient rejection instead of claiming mail was accepted', async () => {
    const notify = createContactNotifier({ env, createTransport: () => ({ sendMail: async () => ({ accepted: [], rejected: ['owner@example.com'] }) }) });
    await expect(notify(row)).rejects.toThrow('Notification recipient was not accepted');
  });

  it('uses a fallback subject and keeps untrusted markup as plain text', async () => {
    let mail;
    const notify = createContactNotifier({ env, createTransport: () => ({ sendMail: async (message) => { mail = message; return { accepted: ['owner@example.com'] }; } }) });
    await notify({ ...row, subject: '', message: '<script>not HTML</script>' });
    expect(mail.subject).toBe('[Portfolio] New contact message');
    expect(mail.text).toContain('<script>not HTML</script>');
    expect(mail.html).toBeUndefined();
  });
});
