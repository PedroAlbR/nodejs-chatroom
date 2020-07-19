'use strict';

const router = require('express').Router(),
  { postUser, getUsers, getUser } = require('./handler');

router.get('/:username', getUser);
router.get('/', getUsers);
router.post('/', postUser);

module.exports = router;
