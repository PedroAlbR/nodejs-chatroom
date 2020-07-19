'use strict';

const router = require('express').Router(),
  { postMessage, getByChatroom } = require('./handler');

router.get('/chatroom/:id', getByChatroom);
router.post('/', postMessage)

module.exports = router;
