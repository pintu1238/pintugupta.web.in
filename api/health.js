import express from 'express';

const app = express();

function health(_request, response) {
  response.json({ ok: true, service: 'portfolio-api' });
}

app.get(['/', '/api', '/api/health'], health);

export default app;
