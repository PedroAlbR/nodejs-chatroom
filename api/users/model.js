'use strict';

const { USERS_TABLE_NAME } = require('../services/constants'),
  db = require('../services/postgres');

function put(username, { name, password, chatrooms }, create = false) {
  return db.put(USERS_TABLE_NAME, username, { name, password, chatrooms }, create);
}

function getAll() {
  return db.getBy(USERS_TABLE_NAME, []);
}
// Do this or patch request
function addChatrooms(chatrooms = []) {}

module.exports.get = (key) => db.get(USERS_TABLE_NAME, key);
module.exports.put = put;
module.exports.getAll = getAll;
