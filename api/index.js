'use strict'

const express = require('express'),
  cors = require('cors'),
  app = express(),
  { API_PORT } = require('../services/constants'),
  postgres = require('./services/postgres'),
  routes = require('./routes');

app.use(express.json());
app.use(cors())
app.use(routes);

postgres.connect()
  .then(() => app.listen(API_PORT))
  .then(() => console.log(`Listening app from port ${API_PORT}`))
  .catch(error => console.log(error.message));
