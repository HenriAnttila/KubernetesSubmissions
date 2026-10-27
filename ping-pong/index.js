const fs = require('fs');
const path = require('path');
const filePath = path.join(process.env.SHARED_DIR, 'pingpong.txt');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

let counter = 0;

app.get('/pingpong', (req, res) => {
  res.send(`pong ${counter}`);
  counter++;
  fs.writeFileSync(filePath, String(counter));
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
