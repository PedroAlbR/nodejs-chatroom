'use strict';

const { USERS_TABLE_NAME } = require('../../services/constants'),
  db = require('../postgres');


function put(username, { name, password, chatrooms }, create = false) {
  return db.put(USERS_TABLE_NAME, username, { name, password, chatrooms });
}

// Do this or patch request
function addChatrooms(chatrooms = []) {

}

module.exports.get = key => db.get(USERS_TABLE_NAME, key);
module.exports.put = put;
module.exports.del = key => db.del(USERS_TABLE_NAME, key);
