const fs = require('fs');
const path = require('path');
const filePath = path.join(process.env.LOG_DIR, 'log.txt');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading log file');
      return;
    }
    res.send(data);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
