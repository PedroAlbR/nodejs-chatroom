'use strict'

const express = require('express'),
  app = express(),
  publishMessage = require('../db/redis');
 
app.get('/', function (req, res) {
  if (req.query.q) {
    publishMessage(req.query.q)
    return res.send('ok');
  }

  res.send('no message sent');
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
})
