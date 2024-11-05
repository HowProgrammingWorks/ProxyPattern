'use strict';

const fs = require('./2-proxy.js');

const main = async () => {
  const stream = fs.createReadStream('./1-fs.js', 'utf8');
  for await (const chunk of stream) {
    console.log(chunk);
  }
  if (fs.getStatistics) {
    const output = fs.getStatistics();
    console.log(output);
  }
};

main();
