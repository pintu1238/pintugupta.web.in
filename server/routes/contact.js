import { Router } from 'express';
import { validateContactPayload } from '../validation.js';

export function createContactRouter(pool) {
  const router = Router();

  router.post('/', async (request, response) => {
    const result = validateContactPayload(request.body);

    if (!result.ok) {
      return response.status(400).json({ ok: false, errors: result.errors });
    }

    if (!pool) {
      return response.status(503).json({
        ok: false,
        message: 'Contact service is not configured yet.',
      });
    }

    try {
      await pool.query(
        `insert into contact_messages (name, email, subject, message)
         values ($1, $2, $3, $4)`,
        [result.value.name, result.value.email, result.value.subject || null, result.value.message],
      );

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
