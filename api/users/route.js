'use strict';

const router = require('express').Router(),
  { postUser, getUsers, getUser, loginUser } = require('./handler');

router.post('/login', loginUser);
router.get('/:username', getUser);
router.get('/', getUsers);
router.post('/', postUser);

module.exports = router;
