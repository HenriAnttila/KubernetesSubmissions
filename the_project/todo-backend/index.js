const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT;

const pool = new Pool();

app.use(express.json());

app.get('/todos', async (req, res) => {
  const { rows } = await pool.query('SELECT content FROM todos ORDER BY id');
  res.json(rows.map(row => row.content));
});

app.post('/todos', async (req, res) => {
  await pool.query('INSERT INTO todos (content) VALUES ($1)', [req.body.todo]);
  res.status(201).json(req.body.todo);
});

pool.query('CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, content TEXT NOT NULL)').then(() => {
  app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`);
  })
});
