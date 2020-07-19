'use strict';

const MESSAGE = require('./model'),
  bus = require('../services/redis');

function getByChatroom(req, res) {
  return MESSAGE.getByChatroom(req.params.id)
    .then(data => res.json(data.slice(0, 50)))
}

function validateMessage(obj) {
  if (!obj.message || !obj.chatroom_id || !obj.username) {
    return new Error(`Missing parameter in object ${JSON.stringify(obj)}`)
  }
}

function postMessage(req, res) {
  const { body } = req,
    {
      message,
      chatroom_id,
      username
    } = body,
    error = validateMessage(body);

  if (error) return res.status(422).json(error.message);

  return MESSAGE.put({ message, chatroom_id, username })
    .then(() => bus.publish(username, message, chatroom_id))
    .then(() => res.send({ message, chatroom_id, username }));
}

module.exports.getByChatroom = getByChatroom;
module.exports.postMessage = postMessage;
