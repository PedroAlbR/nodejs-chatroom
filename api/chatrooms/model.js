'use strict';

const { CHATROOM_TABLE_NAME } = require('../../services/constants'),
  db = require('../services/postgres');

// Always going to create
function put(name) {
  return db.put(CHATROOM_TABLE_NAME, name, { name }, true)
}

module.exports.get = key => db.get(CHATROOM_TABLE_NAME, key);
module.exports.put = put;
module.exports.del = key => db.del(CHATROOM_TABLE_NAME, key);
