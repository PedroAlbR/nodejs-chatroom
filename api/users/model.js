'use strict';

const { USERS_TABLE_NAME } = require('../services/constants'),
  db = require('../services/postgres');

function put(username, { name, password, chatrooms }, upsert = false) {
  return db.put(USERS_TABLE_NAME, username, { name, password, chatrooms }, upsert);
}

function getAll() {
  return db.getBy(USERS_TABLE_NAME, []);
}

function update(username, { name, chatrooms, password }) {
  return module.exports.get(username).then((user) => {
    const updatedUser = { password: user.password };

    if (chatrooms) {
      const updatedChatrooms = chatrooms.reduce((acum, cr) => {
        if (!acum.includes(cr)) acum.push(cr);
        return acum;
      }, user.chatrooms);

      updatedUser.chatrooms = JSON.stringify(updatedChatrooms);
    }

    if (password) updatedUser.password = password;
    if (name) updatedUser.name = name;

    return module.exports.put(username, updatedUser, true).then(() => {
      delete user.password;
      delete updatedUser.password;

      if (updatedUser.chatrooms) {
        updatedUser.chatrooms = JSON.parse(updatedUser.chatrooms);
      }

      return Object.assign({}, user, updatedUser);
    });
  });
}

module.exports.get = (key) => db.get(USERS_TABLE_NAME, key);
module.exports.put = put;
module.exports.getAll = getAll;
module.exports.update = update;
