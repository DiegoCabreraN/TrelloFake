require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {
  serverPort,
  connections,
} = require('./src/config');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(parseInt(serverPort, 10), () => {
  console.log(`Server is running on Port: ${parseInt(serverPort, 10)}`);
});

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

app.post('/create/:type', async (req, res) => {
  if (req.params.type === 'user') {
    const query = await connections.User.find(
      {
        mail: req.body.mail,
      },
    );
    if (query.length === 0) {
      const newUser = new connections.User(req.body);
      const savedData = await newUser.save();
      res.status(200).send(savedData._id);
    } else {
      res.status(500).end();
    }
  } else if (req.params.type === 'board') {
    const boardDocument = {
      name: req.body.name,
      sessions: [req.body.session],
    };
    const newBoard = new connections.Board(boardDocument);
    const savedData = await newBoard.save();
    res.status(200).send(savedData._id);
  } else if (req.params.type === 'column') {
    const columnDocument = {
      name: req.body.name,
      boardId: req.body.boardId,
      sessions: [req.body.session],
    };
    const newColumn = new connections.Column(columnDocument);
    const savedData = await newColumn.save();
    res.status(200).send(savedData._id);
  } else if (req.params.type === 'task') {
    const query = await connections.Column.findOne(
      {
        name: req.body.colName,
        sessions: [req.body.session],
        boardId: req.body.boardId,
      },
    );
    const taskDocument = {
      description: req.body.description,
      columnId: query._id,
      boardId: req.body.boardId,
    };
    const newTask = new connections.Task(taskDocument);
    const savedData = await newTask.save();
    res.status(200).send(savedData._id);
  }
  res.end();
});

app.post('/get/:type', async (req, res) => {
  if (req.params.type === 'user') {
    const query = await connections.User.find(
      {
        username: req.body.username,
      },
    );
    if (query.length !== 0
        && query[0].username === req.body.username
        && query[0].password === req.body.password
    ) {
      res.status(200).send(query[0]._id);
    } else {
      res.status(500).end();
    }
    res.end();
  } else if (req.params.type === 'board') {
    const query = await connections.Board.find(
      {
        sessions: [req.body.session],
      },
    );
    res.status(200).send(query);
  } else if (req.params.type === 'column') {
    const query = await connections.Column.find(
      {
        sessions: [req.body.session],
        boardId: req.body.boardId,
      },
    );
    res.status(200).send(query);
  } else if (req.params.type === 'task') {
    const query = await connections.Task.find(
      {
        columnId: req.body.columnId,
        boardId: req.body.boardId,
      },
    );
    res.status(200).send(query);
  }
  res.end();
});

app.post('/delete/:type', async (req, res) => {
  if (req.params.type === 'board') {
    connections.Task.deleteMany(
      {
        boardId: req.body.id,
      },
    ).then(() => {
      connections.Column.deleteMany(
        {
          boardId: req.body.id,
        },
      ).then(() => {
        connections.Board.deleteOne(
          {
            _id: req.body.id,
          },
        ).then(() => {
          res.send('complete!');
        });
      });
    });
  } else if (req.params.type === 'column') {
    await connections.Task.deleteMany(
      {
        columnId: req.body.id,
      },
    );
    connections.Column.deleteOne(
      {
        _id: req.body.id,
      },
    ).then(async () => {
      const query = await connections.Column.find(
        {
          sessions: [req.body.session],
          boardId: req.body.boardId,
        },
      );
      res.status(200).send(query);
    });
  } else if (req.params.type === 'task') {
    connections.Task.deleteOne(
      {
        _id: req.body.id,
      },
    ).then(async () => {
      const query = await connections.Task.find(
        {
          columnId: req.body.columnId,
          boardId: req.body.boardId,
        },
      );
      res.status(200).send(query);
    });
  }
});

app.post('/updateTask/', async (req, res) => {
  const currentTask = await connections.Task.findOne(
    {
      _id: req.body.id,
    },
  );
  currentTask.description = req.body.newDescription;
  currentTask.columnId = req.body.columnId;
  const currentTaskDoc = connections.Task(currentTask);
  currentTaskDoc.save().then((data) => {
    res.status(200).send(data._id);
  });
});
