const { EOL, cpus, homedir, userInfo, arch } = require('node:os');

const Logger = require('../classes/Logger');

const log = new Logger(console.log);

module.exports = fm => arg => {
  const argWithoutPrefix = arg.slice(2).toLowerCase();

  switch (argWithoutPrefix) {
    case 'eol':
      return log.info(`System EOL is: ${EOL}`);
    case 'cpus':
      return log.pure(cpus());
    case 'homedir':
      return log.info(`Home directory is: ${homedir()}`);
    case 'username':
      return log.info(`Username is: ${userInfo().username}`);
    case 'architecture':
      return log.info(`CPU architecture is: ${arch()}`);
    default:
      return log.error('Unsupported argument');
  }
};
