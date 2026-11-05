const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const todos = [];

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
})

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  todos.push(req.body.todo);
  res.status(201).json(req.body.todo);
});
