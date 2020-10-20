import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import * as fs from "fs";
import * as p from "path";
import * as url from 'url';

const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public');

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const {method, url: path, headers} = request;
  const {pathname, search} = url.parse(path);
  const filename = pathname.substr(1)
  fs.readFile(p.resolve(publicDir, filename), (error, data) => {
    if (error) {
      console.log(error)
      response.statusCode = 404
      response.end()
    }else{
      response.end(data.toString())
    }
  });
});

server.listen(8888);