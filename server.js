'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const debug = require('debug')('publication-platform-backend:server');

const errors = require('./lib/error-middleware.js');

dotenv.load();

const PORT = process.env.PORT || 8000;
const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));

app.use(errors);

app.listen(PORT, () => {
  debug(`server running: ${PORT}`);
});
