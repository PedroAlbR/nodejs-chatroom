'use strict';

const Redis = require('ioredis'),
  client = new Redis();

client.subscribe('messages');

client.on('message', (channel, payload) => {
  console.log({ channel, payload });
});
