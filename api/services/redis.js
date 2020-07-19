'use strict';

const Redis = require('ioredis'),
  client = new Redis(6379);

function publish(channel, payload) {
  return client.publish(channel, JSON.stringify(payload));
}

module.exports.publish = publish;
