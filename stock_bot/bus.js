'use strict';

const Redis = require('ioredis'),
  subscriber = new Redis();

function subscribe(channel) {
  return subscriber.subscribe(channel);
}

module.exports.subscriber = subscriber;
module.exports.subscribe = subscribe;
