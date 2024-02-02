const console = require('./console');
const consoleInputStream = require('./consoleInputStream');
const consoleOutputStream = require('./consoleOutputStream');

module.exports = {
  console,
  stream: {
    console: {
      input: consoleInputStream,
      output: consoleOutputStream
    }
  }
};
