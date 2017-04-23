'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const Promise = require('bluebird');
const debug = require('debug')('publication-platform-backend:server');

const errors = require('./lib/error-middleware.js');

const PORT = process.env.PORT || 8000;

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.use(cors());
app.use(morgan('dev'));

app.use(errors);

app.listen(PORT, () => {
  debug(`server running: ${PORT}`);
});
