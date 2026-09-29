import { Router } from 'express';
import { validateContactPayload } from '../validation.js';
import { createContactNotifier } from '../contact-email.js';

export function createContactRouter(pool, { store = null, notify = createContactNotifier() } = {}) {
  const router = Router();

  router.post('/', async (request, response) => {
    const result = validateContactPayload(request.body);

    if (!result.ok) {
      return response.status(400).json({ ok: false, errors: result.errors });
    }

    if (!pool && !store) {
      return response.status(503).json({
        ok: false,
        message: 'Contact service is not configured yet.',
      });
    }

    try {
      if (pool) {
        await pool.query(
          `insert into contact_messages (name, email, subject, message)
           values ($1, $2, $3, $4)`,
          [result.value.name, result.value.email, result.value.subject || null, result.value.message],
        );
      } else {
        await store.insert({ ...result.value, subject: result.value.subject || null });
      }

      // Await SMTP before the serverless invocation ends. Storage remains
      // authoritative so an email outage does not invite duplicate submissions.
      if (notify) {
        try {
          await notify(result.value);
          console.info('Contact email notification accepted by Gmail.');
        } catch {
          // SMTP errors may contain credentials or visitor data; never log them.
          console.error('Contact saved; email notification failed. Check SMTP configuration.');
        }
      }

      return response.status(201).json({ ok: true });
    } catch (error) {
      console.error('Unable to save contact message:', error instanceof Error ? error.message : 'unknown error');
      return response.status(500).json({
        ok: false,
        message: 'We could not save your message right now. Please try again.',
      });
    }
  });

  return router;
}
