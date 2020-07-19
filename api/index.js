'use strict'

const express = require('express'),
  app = express(),
  { API_PORT } = require('../services/constants'),
  postgres = require('../db/postgres'),
  routes = require('./routes');
 
app.use(express.json());
app.use(routes);

postgres.connect()
  .then(() => app.listen(API_PORT))
  .then(() => console.log(`Listening app from port ${API_PORT}`))
  .catch(error => console.log(error.message));
