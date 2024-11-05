'use strict';

const fs = require('node:fs');

const statistics = { bytes: 0, chunks: 0, events: {} };

class StatReadStream extends fs.ReadStream {
  emit(name, data) {
    if (name === 'data') {
      statistics.bytes += data.length;
      statistics.chunks++;
    }
    const counter = statistics.events[name] || 0;
    statistics.events[name] = counter + 1;
    super.emit(name, data);
  }
}

const getStatistics = () => structuredClone(statistics);

const createReadStream = (path, options) => new StatReadStream(path, options);

module.exports = { ...fs, createReadStream, getStatistics };
