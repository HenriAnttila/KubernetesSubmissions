const crypto = require('crypto');
const random_string = crypto.randomUUID();
let latest = '';

const fs = require('fs');
const path = require('path');
const filePath = path.join(process.env.LOG_DIR, 'log.txt');

const step = () => {
  latest = `${new Date().toISOString()}: ${random_string}`;
  console.log(latest);
  fs.writeFileSync(filePath, latest);
}

step();
setInterval(step, 5000);
