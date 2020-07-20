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
