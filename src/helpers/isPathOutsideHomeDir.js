const { homedir } = require('node:os');

const homeDirPath = homedir();

module.exports = absolutePath => !absolutePath.includes(homeDirPath);
