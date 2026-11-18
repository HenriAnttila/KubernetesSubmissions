const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 4000;

const pool = new Pool();
pool.on('error', err => console.log(`Idle database connection lost: ${err.message}`));

const initDb = async () => {
  for (;;) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS counter (id INT PRIMARY KEY, value INT NOT NULL);
        INSERT INTO counter (id, value) VALUES (1, 0) ON CONFLICT (id) DO NOTHING;
      `);
      return;
    } catch (err) {
      console.log(`Database not ready (${err.message}), retrying in 2s`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
};

app.get('/pingpong', async (req, res) => {
  const { rows } = await pool.query('UPDATE counter SET value = value + 1 WHERE id = 1 RETURNING value');
  res.send(`pong ${rows[0].value - 1}`);
});

app.get('/pings', async (req, res) => {
  const { rows } = await pool.query('SELECT value FROM counter WHERE id = 1');
  res.send(String(rows[0].value));
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`);
  });
});
