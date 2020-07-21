'use strict';

const USER = require('./model'),
  {
    validatePassword,
    validateUser,
    encodePassword,
    validateUserUpdate,
  } = require('./utils');

function getUsers(req, res) {
  return USER.getAll()
    .then((data) => data.map(({ password, ...info }) => info)) //Removing the password
    .then((data) => res.json(data));
}

function getUser(req, res) {
  return USER.get(req.params.username.toLowerCase())
    .then((user) => {
      delete user.password;
      res.send(user);
    })
    .catch((error) => {
      res.status(404).json({ message: error.message, status: 404 });
    });
}

function updateUser(req, res) {
  const { body } = req,
    username = req.params.username,
    error = validateUserUpdate(username, body);

  if (error)
    return res.status(422).json({ status: 422, message: error.message });

  if (body.password) body.password = encodePassword(body.password);
  return USER.update(username.toLowerCase(), body).then((user) => res.json(user));
}

function postUser(req, res) {
  const { body } = req,
    { username, password, name } = body,
    error = validateUser(body);

  if (error)
    return res.status(422).json({ status: 422, message: error.message });

  const data = {
    name,
    password: encodePassword(password),
    chatrooms: JSON.stringify([]),
  };

  return USER.put(username.toLowerCase(), data)
    .then(() => {
      data.username = username.toLowerCase();
      return res.send(data);
    })
    .catch((error) => {
      if (error.constraint !== 'users_pkey')
        return res.status(400).send({ status: 400, message: error.message });

      return res
        .status(409)
        .json({ status: 409, message: `User ${username} already exists` });
    });
}

function loginUser(req, res) {
  const error = validateUser(req.body);

  if (error)
    return res.status(422).json({ status: 422, message: error.message });

  return authenticateUser(req, res);
}

function authenticateUser(req, res) {
  const { username, password } = req.body;

  return USER.get(username.toLowerCase())
    .then((user) => {
      if (!validatePassword(password, user.password))
        return res.status(401).json({
          status: 401,
          message: `Invalid username and password combination.`,
        });

      delete user.password;

      res.json({ ...user, status: 200 });
    })
    .catch((error) => {
      if (error.constraint !== 'users_pkey')
        return res.status(400).send({ status: 400, message: error.message });

      return res
        .status(409)
        .json({ status: 409, message: `User ${username} already exists` });
    });
}

module.exports.postUser = postUser;
module.exports.getUser = getUser;
module.exports.getUsers = getUsers;
module.exports.loginUser = loginUser;
module.exports.updateUser = updateUser;
