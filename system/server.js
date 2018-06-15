const http = require('http')
const app = require('../app.js')
const config = require('./config.js')

const port = process.env.PORT || config.settings.port;

const server = http.createServer(app)
server.listen(port, () => {
  console.log('Server active on : '+port);
});

module.exports = server;
