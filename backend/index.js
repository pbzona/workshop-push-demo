const path = require('path');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());

const { createIOServer } = require('./src/io');
const { getRandomString, getFileContents } = require('./src/helpers');

const http = require('http');
const { FileWatcher } = require('./src/watcher');
const server = http.createServer(app);
const io = createIOServer(server);

// Workshop stuff
const file = path.join(__dirname, 'workshop', 'myfile.txt')
const watcher = new FileWatcher(file);

watcher.on('change', () => {
  const data = getFileContents(file);
  io.emit('msg', data);
});

// Express stuff
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

// Socket stuff
io.on('connection', socket => {
  console.log('a user connected');
  
  const data = getFileContents(file);
  io.emit('msg', data);

  socket.on('ping', () => {
    console.log('Received ping')
    io.emit('msg', getRandomString());
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});