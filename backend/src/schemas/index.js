const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  mail: String,
  password: String,
  fName: String,
  lName: String,
  birthday: String,
});

const BoardSchema = new Schema({
  name: String,
  sessions: Array,
});

const ColumnSchema = new Schema({
  name: String,
  boardId: String,
  sessions: Array,
});

const TaskSchema = new Schema({
  description: String,
  columnId: String,
  boardId: String,
});

module.exports = {
  UserSchema,
  BoardSchema,
  ColumnSchema,
  TaskSchema,
};
