'use strict';

const { MESSAGES_TABLE_NAME } = require('../services/constants'),
  db = require('../services/postgres');

// Always going to create
function put({ message, chatroom_id, username }) {
  return db.put(MESSAGES_TABLE_NAME, null, { message, chatroom_id, username }, false);
}

function getByChatroom(id) {
  return db.getBy(MESSAGES_TABLE_NAME, [
    ['chatroom_id', id]
  ]);
}

module.exports.getByChatroom = getByChatroom;
module.exports.put = put;
