import 'dotenv/config';
import { createApp } from './app.js';

const port = Number(process.env.PORT || 4000);
const { app, pool } = createApp();

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
