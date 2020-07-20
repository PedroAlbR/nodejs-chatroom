'use strict';

const router = require('express').Router(),
  { postChatroom, getChatrooms, getChatroom } = require('./handler');

router.get('/:id', getChatroom);
router.get('/', getChatrooms);
router.post('/', postChatroom);

module.exports = router;
