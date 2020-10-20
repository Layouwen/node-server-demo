import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";

const server = http.createServer();

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const array = [];
  console.log(request.httpVersion);
  console.log(request.url);

  request.on('data', (chunk) => {
    array.push(chunk);
  });
  request.on('end', () => {
    const body = Buffer.concat(array).toString();
    console.log('body', body);
    response.end('finish')
  });

});

server.listen(8888);