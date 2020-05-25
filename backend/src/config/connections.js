const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URI;

const {
  UserSchema,
  BoardSchema,
  ColumnSchema,
  TaskSchema,
} = require('../schemas');

const conectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(
  mongoUrl.concat('/boards?retryWrites=true&w=majority'),
  conectionOptions,
);

const userConnection = mongoose.createConnection(
  mongoUrl.concat('/users?retryWrites=true&w=majority'),
  conectionOptions,
);

const User = userConnection.model('User', UserSchema);

const Board = mongoose.model('Board', BoardSchema);

const Column = mongoose.model('Column', ColumnSchema);

const Task = mongoose.model('Task', TaskSchema);

module.exports = {
  User,
  Board,
  Column,
  Task,
};
