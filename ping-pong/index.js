const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

let counter = 0;

app.get('/pingpong', (req, res) => {
  res.send(`pong ${counter}`);
  counter++;
});

app.get('/pings', (req, res) => {
  res.send(String(counter));
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
