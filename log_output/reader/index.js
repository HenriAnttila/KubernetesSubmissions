const fs = require('fs');
const path = require('path');
const filePath = path.join(process.env.LOG_DIR, 'log.txt');
const infoPath = path.join(process.env.CONFIG_DIR, 'information.txt');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  fs.readFile(filePath, 'utf8', async (err, data) => {
    if (err) {
      res.status(500).send('Error reading log file');
      return;
    }
    let info;
    try {
      info = await fs.promises.readFile(infoPath, 'utf8');
    } catch {
      res.status(500).send('Error reading information file');
      return;
    }
    try {
      const response = await fetch(`${process.env.PING_PONG_URL}/pings`);
      const count = await response.text();
      res.type('text/plain').send(
        `file content: ${info.trim()}\n` +
        `env variable: MESSAGE=${process.env.MESSAGE}\n` +
        `${data}.\nPing / Pongs: ${count}`
      );
    } catch {
      res.status(500).send('Error fetching pings');
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
