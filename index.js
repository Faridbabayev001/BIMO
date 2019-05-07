require('dotenv').config(); // Sets up dotenv as soon as our application starts
require('module-alias/register')

const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const environment = process.env.NODE_ENV; // development
const stage = require('@root/config');

require("@root/db.js")();

const routes = require('@routes/index.route');

app.use('/api/v1', routes(router));



if (environment !== 'production') {
  app.use(logger('dev'));
}

app.use('/api/v1', (req, res, next) => {
  res.send('Hello');
  next();
});

app.listen(`${stage.port}`, () => {
  console.log(`Server now listening at localhost: ${stage.port}`);
});

module.exports = app;