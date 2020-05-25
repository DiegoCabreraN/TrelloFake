const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 5000;

const url = 'mongodb+srv://client:clusterPass@cluster0-1neae.mongodb.net';
boardConnection = mongoose.connect(url.concat('/boards?retryWrites=true&w=majority'), {useNewUrlParser: true, useUnifiedTopology: true});
userConnection = mongoose.createConnection(url.concat('/users?retryWrites=true&w=majority'), {useNewUrlParser: true, useUnifiedTopology: true});

const User = userConnection.model('User',{
  username: String,
  password: String,
  fName: String,
  lName: String,
  birthday: String,
});

const Board = mongoose.model('Board',{
  name: String,
  sessions: Array,
});

const Column = mongoose.model('Column',{
  name: String,
  boardId: String,
  sessions: Array,
});

const Task = mongoose.model('Task',{
  description: String,
  columnId: String,
  boardId: String,
});

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

app.post('/createUser/', async (req,res)=>{
  const query = await User.find({ "username": req.body.username});
  if(query.length === 0){
    const newUser = new User(req.body);
    const savedData = await newUser.save();
    res.status(200).send(savedData._id);
  }
  else{
    res.status(500).end();;
  }
});

app.post('/getUser/', async (req,res)=>{
  const query = await User.find({ "username": req.body.username});
  if(query.length !== 0 && query[0].username === req.body.username && query[0].password === req.body.password){
    res.status(200).send(query[0]._id);
  }
  else{
    res.status(500).end();
  }
  res.end();
})

app.post('/createBoard/', async (req,res)=>{
  const boardDocument = {
    name: req.body.name,
    sessions: [req.body.session],
  }
  const newBoard = new Board(boardDocument);
  const savedData = await newBoard.save();
  res.status(200).send(savedData._id);
});

app.post('/getBoard/', async (req,res)=>{
  const query = await Board.find({ "sessions": [req.body.session]});
  console.log(query);
  res.status(200).send(query);
});

app.post('/deleteBoard/', async (req,res)=>{
  Board.deleteOne({_id: req.body.id},(err) => {
    if (err) {
      return next(err);
    }
    res.send("complete!");
  });
});

app.post('/getColumns/', async (req,res)=>{
  const query = await Column.find({ "sessions": [req.body.session], "boardId": req.body.boardId});
  res.status(200).send(query);
});

app.post('/createColumn/', async (req,res)=>{
  const columnDocument = {
    name: req.body.name,
    boardId: req.body.boardId,
    sessions: [req.body.session],
  }
  const newColumn = new Column(columnDocument);
  const savedData = await newColumn.save();
  res.status(200).send(savedData._id);
});

app.post('/deleteColumn/', async (req,res)=>{
  Column.deleteOne({_id: req.body.id},(err) => {
    if (err) {
      return next(err);
    }
  }).then(async ()=>{
    const query = await Column.find({ "sessions": [req.body.session], "boardId": req.body.boardId});
    console.log(query);
    res.status(200).send(query);
  });
});

app.post('/getTasks/', async (req,res)=>{
  const query = await Task.find({ "columnId": req.body.columnId, "boardId": req.body.boardId});
  res.status(200).send(query);
});

app.post('/createTask/', async (req,res)=>{
  const query = await Column.findOne({"name":req.body.colName,"sessions":[req.body.session], "boardId": req.body.boardId});
  console.log(req.body, query);
  const columnId = query._id;
  const taskDocument = {
    description: req.body.description,
    columnId: columnId,
    boardId: req.body.boardId,
  }
  const newTask = new Task(taskDocument);
  const savedData = await newTask.save();
  res.status(200).send(savedData._id);
});

app.post('/deleteTask/', async (req,res)=>{
  console.log(req.body);
  Task.deleteOne({_id: req.body.id},(err) => {
    if (err) {
      return next(err);
    }
  }).then(async ()=>{
    const query = await Task.find({ "columnId": req.body.columnId, "boardId": req.body.boardId});
    res.status(200).send(query);
  });
});

app.post('/updateTask/', async (req,res)=>{

  const currentTask = await Task.findOne({ "_id": req.body.id});
  currentTask.description = req.body.newDescription;
  currentTask.columnId = req.body.columnId;
  console.log(currentTask);
  const currentTaskDoc = Task(currentTask);
  currentTaskDoc.save().then((data)=>{
    res.status(200).send(data._id);
  });
});
