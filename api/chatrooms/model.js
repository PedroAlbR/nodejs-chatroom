'use strict';

const { CHATROOM_TABLE_NAME } = require('../services/constants'),
  db = require('../services/postgres');

function put(name, upsert = false) {
  return db.put(CHATROOM_TABLE_NAME, null, { name }, upsert, true);
}

function getAll() {
  return db.getBy(CHATROOM_TABLE_NAME, []);
}

module.exports.get = (key) => db.get(CHATROOM_TABLE_NAME, key);
module.exports.put = put;
module.exports.getAll = getAll;
