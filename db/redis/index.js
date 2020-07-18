'use strict';

const Redis = require('ioredis'),
  client = new Redis(6379);

function publish(message) {
  const payload = { message, username: '', timestamp: Date.now() };
  
  return client.publish('messages', JSON.stringify(payload))
}

module.exports = publish;