'use strict';

const CHATROOM = require('./model');

function validateChatroom({ name }) {
  if (!name) return new Error(`Missing chatroom name`);
}

function getChatrooms(req, res) {
  return CHATROOM.getAll().then((data) => res.json(data));
}

function getChatroom(req, res) {
  return CHATROOM.get(req.params.id)
    .then((chatroom) => res.send(chatroom))
    .catch((error) =>
      res.status(404).json({ message: error.message, status: 404 })
    );
}

function postChatroom(req, res) {
  const { body } = req,
    { name } = body,
    error = validateChatroom(body);

  if (error)
    return res.status(422).json({ status: 422, message: error.message });

  return CHATROOM.put(name)
    .then(() => res.status(201).send({ name }))
    .catch((error) => {
      return res.status(409).json({ status: 409, message: error.message });
    });
}

module.exports.postChatroom = postChatroom;
module.exports.getChatroom = getChatroom;
module.exports.getChatrooms = getChatrooms;
