const mongoose = require("mongoose");
const http = require("http");

const option = process.argv;
const config = require("./config");

// Data handling configuration.
let db = config.setup.development.database;
let port = process.env.PORT || config.setup.development.PORT;
let sign = config.setup.development.sign;
let cryptoKey = config.setup.development.cryptoKey;

mongoose.Promise = global.Promise;

// Environment Setup
if (option[2] === 'development' || option[2] === null || option[2] == undefined) {
    process.env.NODE_ENV = 'development';
    global.cryptoKey = cryptoKey;
    port = process.env.PORT || config.setup.development.PORT;
    db = config.setup.development.database;
    global.xe = {
      "morgan": "dev",
      "sign": config.setup.development.sign,
      "cbLink": config.setup.development.cbLink,
      "salt": config.setup.development.salt
    };
} else if (option[2] === 'testing') {
    process.env.NODE_ENV = 'testing';
    global.cryptoKey = config.setup.testing.cryptoKey;
    port = process.env.PORT || config.setup.testing.PORT;
    db = config.setup.testing.database;
    global.xe = {
      "morgan": "tiny",
      "sign": config.setup.testing.sign,
      "cbLink": config.setup.testing.cbLink,
      "salt": config.setup.testing.salt
    };
} else if (option[2] === 'production') {
    console.log("IN PRODUCTION");
    global.cryptoKey = config.setup.production.cryptoKey;
    db = config.setup.production.database;
    port = process.env.PORT || config.setup.production.PORT;
    global.xe = {
      "sign": config.setup.production.sign,
      "cbLink": config.setup.production.cbLink,
      "salt": config.setup.production.salt
    }

    if (process.env.NODE_ENV != 'production') {
      process.env.NODE_ENV = 'production';
      global.httpsRedir = true;
    }
}

const app = require("../app");
const server = http.createServer(app);

// Mongo Connection
mongoose.connect(db, (err) => {
    if (!err) { console.log('Database Connected.');}
    else { console.log(err); }
});

// Core Server Setup
server.listen(port, () => {
  console.log('Server active on port : '+port);
});

module.exports = server;
