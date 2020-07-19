'use strict';

const Redis = require('ioredis'),
  subscriber = new Redis(),
  publisher = new Redis();

function publish(channel, payload) {
  return publisher.publish(channel, JSON.stringify(payload));
}

function subscribe(channel) {
  return subscriber.subscribe(channel);
}

module.exports.subscriber = subscriber;
module.exports.publisher = publisher;
module.exports.publish = publish;
module.exports.subscribe = subscribe;
