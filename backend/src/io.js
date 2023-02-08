const { Server } = require('socket.io');

function createIOServer(server) {
  return new Server(server, {
    cors: {
      origin: 'http://127.0.0.1:5173'
    }
  });
};

module.exports = { createIOServer };