const { FileWatcher } = require('./watcher');

class Workshop {
  constructor(directory, ioServer) {
    this.directory = directory;
    this.io = ioServer;
    this.files = [];
  }

  init() {
    
  }
}

module.exports = { Workshop };
