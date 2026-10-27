const fs = require('fs');
const path = require('path');
const filePath = path.join(process.env.LOG_DIR, 'log.txt');
const pingPongPath = path.join(process.env.SHARED_DIR, 'pingpong.txt');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading log file');
      return;
    }
    fs.readFile(pingPongPath, 'utf8', (err, pings) => {
      const count = err ? 0 : pings;
      res.type('text/plain').send(`${data}.\nPing / Pongs: ${count}`);
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
