const crypto = require('crypto');
const http = require('http');
const PORT = process.env.PORT || 3000;
const random_string = crypto.randomUUID();
let latest = '';

setInterval(() => {
  latest = `${new Date().toISOString()}: ${random_string}`;
  console.log(latest);
}, 5000)

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(latest);
}).listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
})
