
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(latest);
}).listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
})
