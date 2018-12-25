//basic node.js webserver

console.log("Hello from app.js");

const http = require('http'); //using the HTTP module

//host and port for the web server
const hostname = '127.0.0.1';
const port = 3000;

//set up what the server will do
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

//run the server on the specified host and port
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});