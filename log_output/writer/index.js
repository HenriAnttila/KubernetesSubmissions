const crypto = require('crypto');
const random_string = crypto.randomUUID();
let latest = '';

const fs = require('fs');
const path = require('path');
const filePath = path.join(process.env.LOG_DIR, 'log.txt');

setInterval(() => {
  latest = `${new Date().toISOString()}: ${random_string}`;
  console.log(latest);
  fs.writeFileSync(filePath, latest);
}, 5000)
