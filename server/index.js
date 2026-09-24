import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import { createPool } from './db.js';
import { createContactRouter } from './routes/contact.js';

const app = express();
const port = Number(process.env.PORT || 4000);
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
const pool = createPool();

app.use(cors({ origin: frontendOrigin }));
app.use(express.json({ limit: '32kb' }));

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, service: 'portfolio-api' });
});

app.use('/api/contact', createContactRouter(pool));

app.use((error, _request, response, next) => {
  void next;
  if (error instanceof SyntaxError) {
    return response.status(400).json({ ok: false, message: 'Please send valid JSON.' });
  }

  console.error('Unhandled API error:', error instanceof Error ? error.message : 'unknown error');
  return response.status(500).json({ ok: false, message: 'Unexpected server error.' });
});

const server = app.listen(port, () => {
  console.log(`Portfolio API listening on http://localhost:${port}`);
});

function shutdown() {
  server.close(() => {
    if (pool) void pool.end();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
