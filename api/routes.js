'use strict';

const router = require('express').Router(),
  chatroomsRoute = require('./chatrooms/route'),
  usersRoute = require('./users/route'),
  messagesRoute = require('./messages/route');

router.use('/chatrooms', chatroomsRoute);
router.use('/users', usersRoute);
router.use('/messages', messagesRoute);

module.exports = router;
