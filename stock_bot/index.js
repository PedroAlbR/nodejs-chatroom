'use strict';

const bus = require('./bus'),
  { parseMessage, getStockData } = require('./utils'),
  COMMAND_RE = /^\/(\w+)=([\w.]+)/;

console.log('stock_bot is online.');

bus.subscribe('messages')
  .then(() => console.log('Subscribed to the "messages" channel'))
  .catch(() => console.log('Failed to connect to the "messages" channel'))

bus.subscriber.on('message', (channel, payload) => {
  const data = JSON.parse(payload);

  if (!channel === 'messages') return;
  if (!COMMAND_RE.test(data.message)) return;

  const [, command, param] = COMMAND_RE.exec(data.message);

  if (command !== 'stock') return;

  return getStockData(param)
    .then(parseMessage)
    .then((message) =>
      bus.publish('messages', { message, chatroom_id: 1, username: 'stock_bot', date: Date.now() })
    )
    .catch(error => console.log(`Something went wrong: ${error.message}`));
});
