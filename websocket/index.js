'use strict';

const { server: WebSocketServer } = require('websocket'),
  http = require('http'),
  Redis = require('ioredis'),
  bus = new Redis(),
  httpServer = http.createServer((req, res) => {
    console.log('Received request for ' + req.url);
    res.writeHead(404);
    res.end();
  });

httpServer.listen(8080, () =>
  console.log('Server is listening on port 8080\n')
);

const wsServer = new WebSocketServer({ httpServer });

wsServer.on('request', (req) => {
  const connection = req.accept('echo-protocol', req.origin);

  console.log('Connection accepted.');

  connection.on('message', function (message) {
    const chatroomChannel = `chatroom-${message.utf8Data}`;

    bus.subscribe(chatroomChannel);
    bus.on('message', (channel, payload) => {
      if (channel === chatroomChannel) {
        connection.sendUTF(payload);
      }
    });
  });

  connection.on('close', function (reasonCode, description) {
    console.log('Peer ' + connection.remoteAddress + ' disconnected.');
  });
});
