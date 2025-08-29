const express = require('express');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'demo',
  host: process.env.POSTGRES_HOST || 'postgres',
  database: process.env.POSTGRES_DB || 'demodb',
  password: process.env.POSTGRES_PASSWORD || 'demo123',
  port: 5432,
});

app.get('/api', async (req, res) => {
  try {
    const r = await pool.query('SELECT NOW() as now');
    res.json({ ok: true, db_time: r.rows[0].now });
  } catch (err) {
    console.error('DB error', err.message || err);
    res.status(500).json({ ok: false, error: err.message || err });
  }
});

app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`);
});
