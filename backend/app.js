const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 5000;

const url = 'mongodb+srv://client:clusterPass@cluster0-1neae.mongodb.net';
boardConnection = mongoose.connect(url.concat('/boards?retryWrites=true&w=majority'), {useNewUrlParser: true, useUnifiedTopology: true});
userConnection = mongoose.createConnection(url.concat('/users?retryWrites=true&w=majority'));

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
