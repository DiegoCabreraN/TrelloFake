const connections = require('./connections');

const {
  SERVER_PORT: serverPort,
  MONGO_URI: mongoUrl,
} = process.env;

module.exports = {
  serverPort,
  mongoUrl,
  connections,
};
