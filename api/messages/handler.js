'use strict';

const MESSAGE = require('./model'),
  bus = require('../services/redis');

function getByChatroom(req, res) {
  return MESSAGE.getByChatroom(req.params.id).then((data) =>
    res.json(data.reverse())
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
    error = validateMessage(body);

  if (error) return res.status(422).json(error.message);

  return MESSAGE.put({ message, chatroom_id, username }).then(() => {
    const date = new Date();

    bus.publish('messages', { username, message, chatroom_id, date });
    return res.send({ message, chatroom_id, username, date });
  });
}

module.exports.getByChatroom = getByChatroom;
module.exports.postMessage = postMessage;
