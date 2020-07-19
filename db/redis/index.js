'use strict';

const Redis = require('ioredis'),
  client = new Redis(6379);

function publish(username, message, chatroom) {
  const payload = { message, username, chatroom, timestamp: Date.now() };

  return client.publish('messages', JSON.stringify(payload))
}

module.exports.publish = publish;
