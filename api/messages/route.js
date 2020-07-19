'use strict';

const router = require('express').Router(),
  { putMessage, getByChatroom } = require('./handler');

router.get('/chatroom/:id', getByChatroom);
router.put('/', putMessage)

module.exports = router;
