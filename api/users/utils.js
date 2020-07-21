'use strict';

const md5 = require('md5');

function validatePassword(password, hash) {
  const [salt, rounds] = hash.split('$'),
    hashedRawPassword = encodePassword(password, { salt, rounds });

  return hash === hashedRawPassword;
}

function validateUser(obj) {
  if (!obj.username || !obj.password) {
    return new Error(`Missing parameter in object ${JSON.stringify(obj)}`);
  }
}

function validateUserUpdate(username, obj) {
  if (!username) return new Error('A username must be passed to update');
  if (obj.chatrooms !== undefined && !Array.isArray(obj.chatrooms))
    return new Error('Chatroom must be an array');

  return (obj.chatrooms || []).reduce((acum, e) => {
    if (acum) return acum;
    if (isNaN(e))
      return new Error('All elements of the chatrooms array must be numbers');
  }, '');
}

function encodePassword(pw, opts = {}) {
  const salt = opts.salt || new Date().getTime(),
    rounds = opts.rounds || 10;

  let hashed = md5(pw + salt);

  for (let i = 0; i <= rounds; i++) {
    hashed = md5(hashed);
  }

  return `${salt}$${rounds}$${hashed}`;
}

module.exports.encodePassword = encodePassword;
module.exports.validatePassword = validatePassword;
module.exports.validateUser = validateUser;
module.exports.validateUserUpdate = validateUserUpdate;
