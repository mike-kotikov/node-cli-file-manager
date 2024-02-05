module.exports = {
  console: require('./console'),
  stream: {
    console: {
      input: require('./consoleInputStream'),
      output: require('./consoleOutputStream')
    }
  }
};
