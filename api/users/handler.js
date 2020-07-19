'use strict';

const USER = require('./model'),
  bus = require('../services/redis');

function validateUser(obj) {
  if (!obj.username || !obj.password) {
    return new Error(`Missing parameter in object ${JSON.stringify(obj)}`);
  }
}

function getUsers(req, res) {
  return USER.getAll()
    .then((data) => data.map(({ password, ...info }) => info)) //Removing the password
    .then((data) => res.json(data));
}

function getUser(req, res) {
  return USER.get(req.params.username)
    .then((user) => {
      delete user.password;
      res.send(user);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message, status: 404 });
    });
}

function postUser(req, res) {
  const { body } = req,
    { username, password, name } = body,
    error = validateUser(body);

  if (error)
    return res.status(422).json({ status: 422, message: error.message });

  const data = { name, password, chatrooms: JSON.stringify([1]) };

  return USER.put(username, data)
    .then(() => {
      data.username = username;
      return res.send(data);
    })
    .catch((error) => {
      if (error.constraint == 'users_pkey')
        return res
          .status(409)
          .json({ status: 409, message: `User ${username} already exists` });
      res.send(400).send(error.message);
    });
}

module.exports.postUser = postUser;
module.exports.getUser = getUser;
module.exports.getUsers = getUsers;
