const express = require('express');

const app = express();

app.listen(5000, function () {
  console.log('Backend listening on port 5000!');
});

app.post('/', function (req, res) {
  res.send('Hello World!');
});
