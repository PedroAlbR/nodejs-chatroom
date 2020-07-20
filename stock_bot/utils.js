'use strict';

const fetch = require('node-fetch'),
  CSV = require('csvtojson');

function parseMessage(csv) {
  return CSV()
    .fromString(csv)
    .then((csvData) => csvData[0])
    .then(({ Symbol, Close }) => {
      if (!Number(Close)) return '';
      return `${Symbol} quote is $${Close} per share`;
    });
}

function getStockData(code) {
  return fetch(
    `https://stooq.com/q/l/?s=${code}&f=sd2t2ohlcv&h&e=csv`
  ).then((res) => res.text());
}

function postMessage(message, chatroom, username) {
  return fetch('http://localhost:3000/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      message,
      chatroom_id: chatroom,
      username,
    }),
  });
}

module.exports.parseMessage = parseMessage;
module.exports.getStockData = getStockData;
module.exports.postMessage = postMessage;
