const crypto = require('crypto');
const random_string = crypto.randomUUID();

setInterval(() => {
  console.log(`${new Date().toISOString()}: ${random_string}`);
}, 5000)
