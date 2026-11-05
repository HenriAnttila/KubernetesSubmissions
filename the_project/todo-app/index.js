const fs = require('fs');
const path = require('path');
const imagePath = path.join(process.env.IMAGE_DIR, 'image.jpg');
const MAX_AGE = 10 * 60 * 1000;

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const TODO_BACKEND_URL = process.env.TODO_BACKEND_URL;

app.use(express.urlencoded());

let fetching = null;

const fetchImage = async () => {
  const res = await fetch('https://picsum.photos/1200');
  if (!res.ok) throw new Error(`picsum responded ${res.status}`);
  fs.writeFileSync(`${imagePath}.tmp`, Buffer.from(await res.arrayBuffer()));
  fs.renameSync(`${imagePath}.tmp`, imagePath);
};

const refresh = () => {
  if (!fetching) fetching = fetchImage().finally(() => { fetching = null; });
  return fetching;
};

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
})

app.get('/', async (req, res) => {
  const todos = await (await fetch(`${TODO_BACKEND_URL}/todos`)).json();
  // i know this isn't safe :D
  res.send(`
    <h1>Todo App</h1>
    <img src="/image" width="600">
    <form method="POST" action="/todos">
      <input name="todo" maxlength="140">
      <button>Send</button>
    </form>
    <ul>
      ${todos.map(todo => `<li>${todo}</li>`).join('')}
    </ul>
  `);
});

app.post('/todos', async (req, res) => {
  await fetch(`${TODO_BACKEND_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ todo: req.body.todo }),
  });
  res.redirect('/');
});

app.get('/image', async (req, res) => {
  if (!fs.existsSync(imagePath)) {
    await refresh();
  } else if (Date.now() - fs.statSync(imagePath).mtimeMs > MAX_AGE) {
    refresh().catch(console.error);
  }
  res.sendFile(imagePath);
});
