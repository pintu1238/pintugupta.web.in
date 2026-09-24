import express from 'express';
import 'dotenv/config';
import { createPool } from '../server/db.js';
import { createContactRouter } from '../server/routes/contact.js';

const app = express();
const pool = createPool();

app.use(express.json({ limit: '32kb' }));
const contactRouter = createContactRouter(pool);
app.use('/', contactRouter);
app.use('/api/contact', contactRouter);

app.use((error, _request, response, next) => {
  void next;
  if (error instanceof SyntaxError) {
    return response.status(400).json({ ok: false, message: 'Please send valid JSON.' });
  }

  console.error('Unhandled API error:', error instanceof Error ? error.message : 'unknown error');
  return response.status(500).json({ ok: false, message: 'Unexpected API error.' });
});

export default app;
