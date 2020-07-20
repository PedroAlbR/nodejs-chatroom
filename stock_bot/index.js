'use strict';

const bus = require('./bus'),
  { parseMessage, getStockData, postMessage } = require('./utils'),
  COMMAND_RE = /^\/(\w+)=([\w.]+)/;

console.log('stock_bot is online.');

bus.subscribe('chatroom-*')
  .then(() => console.log('Subscribed to the "chatroom-*" pattern'))
  .catch(() => console.log('Failed to connect to the "chatroom-*" pattern'));

bus.subscriber.on('pmessage', (pattern, channel, payload) => {
  const data = JSON.parse(payload);

  if (!COMMAND_RE.test(data.message)) return;

  const [, command, param] = COMMAND_RE.exec(data.message);

  if (command !== 'stock') return;

  return getStockData(param)
    .then(parseMessage)
    .then((message) => {
      if (!message) return;
      return postMessage(message, data.chatroom_id, 'stock_bot');
    })
    .catch((error) => console.log(`Something went wrong: ${error.message}`));
});
