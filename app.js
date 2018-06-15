const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

/* Global Path setup for easy require */
global.__base = __dirname + '/';

const config = require(__base + 'system/config.js');

/* Mongoose connection */
mongoose.connect(config.details.database.external);

/* Express Instance */
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

app.set('signature', config.details.sign);

/* Cross-Origin Access */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* API Routes */
app.use('/auth', require('./routes/auth'));

module.exports = app;
