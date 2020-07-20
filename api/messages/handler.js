'use strict';

const MESSAGE = require('./model'),
  bus = require('../services/redis'),
  COMMAND_RE = /^\/.*/;

function getByChatroom(req, res) {
  return MESSAGE.getByChatroom(req.params.id)
    .then((data) => res.json(data.reverse()))
    .catch((error) =>
      res.status(400).json({ message: error.message, status: 400 })
    );
}

function validateMessage(obj) {
  if (!obj.message || !obj.chatroom_id || !obj.username) {
    return new Error(`Missing parameter in object ${JSON.stringify(obj)}`);
  }
}

function postMessage(req, res) {
  const { body } = req,
    { message, chatroom_id, username } = body,
    error = validateMessage(body),
    isCommand = COMMAND_RE.test(message);

  let putInDB = Promise.resolve();

  if (error) return res.status(422).json(error.message);

  // If the message is not a command, add it to the db
  if (!isCommand) putInDB = MESSAGE.put({ message, chatroom_id, username });

  return putInDB.then(() => {
    const date = new Date();

    bus.publish(`chatroom-${chatroom_id}`, { username, message, chatroom_id, date });

    return res.send({ message, chatroom_id, username, date });
  });
}

module.exports.getByChatroom = getByChatroom;
module.exports.postMessage = postMessage;
