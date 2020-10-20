import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';
import * as fs from 'fs';
import * as p from 'path';
import * as url from 'url';

const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public');

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const {method, url: path, headers} = request;
  const {pathname, search} = url.parse(path);
  let filename = pathname.substr(1);

  if (filename === '') filename = 'index.html';
  fs.readFile(p.resolve(publicDir, filename), (error, data) => {
    if (error) {
      fs.readFile(p.resolve(publicDir, '404.html'), (error, data) => {
        response.end(data);
      });
    } else {
      response.end(data);
    }
  });
});

server.listen(8888);