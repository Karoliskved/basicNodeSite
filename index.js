import { createServer } from 'http';
import fs from 'fs';
import { Console } from 'console';
const hostname = '127.0.0.1';
const port = 8080;

const server = createServer((req, res) => {
  let filename = './404.html';
  if (req.url == '/') filename = './index.html';
  else filename = '.' + req.url + '.html';

  fs.readFile(filename, function (err, data) {
    if (err) {
      get404(res);
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
  });
});
server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const get404 = (res) => {
  fs.readFile('./404.html', (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('unexpected file error');
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
  });
};
