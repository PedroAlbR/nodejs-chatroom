'use strict';

const { MESSAGES_TABLE_NAME } = require('../../services/constants'),
  db = require('../postgres');

// Always going to create
function put({ message, chatroom_id, username_id }) {
  return db.put(MESSAGES_TABLE_NAME, null, { message, chatroom_id, username_id }, false);
}

module.exports.get = key => db.get(MESSAGES_TABLE_NAME, key);
module.exports.put = put;
module.exports.del = key => db.del(MESSAGES_TABLE_NAME, key);
