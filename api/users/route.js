'use strict';

const router = require('express').Router(),
  { postUser, getUsers, updateUser, getUser, loginUser } = require('./handler');

router.post('/login', loginUser);
router.route('/:username')
  .get(getUser)
  .put(updateUser)
router.get('/', getUsers);
router.post('/', postUser);

module.exports = router;
