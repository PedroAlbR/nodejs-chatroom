'use strict';

const MESSAGE = require('./model');

function getByChatroom(req, res) {
  return MESSAGE.getByChatroom(req.params.id)
    .then(data => res.json(data.slice(0, 50)))
}

function validateMessage(obj) {
  if (!obj.message || !obj.chatroom_id || !obj.username_id) {
    return new Error(`Missing parameter in object ${JSON.stringify(obj)}`)
  }
}

function putMessage(req, res) {
  const { body } = req,
    error = validateMessage(body);

  if (error) res.status(422).json(error.message);

  return MESSAGE.put(body).then(data => res.send(data));
}

module.exports.getByChatroom = getByChatroom;
module.exports.putMessage = putMessage;
