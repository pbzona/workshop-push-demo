const fs = require('fs');
const EventEmitter = require('events');

class FileWatcher extends EventEmitter {
  constructor(filePath) {
    super();
    this.filePath = filePath;
    this.watch();
  }

  watch() {
    fs.watchFile(this.filePath, (curr, prev) => {
      if (curr.mtime !== prev.mtime) {
        console.log('File changed...')
        this.emit('change');
      }
    });
  }
}

module.exports = { FileWatcher };