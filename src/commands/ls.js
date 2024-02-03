const { cwd } = require('node:process');
const { readdir } = require('node:fs/promises');

const Logger = require('../classes/Logger');
const { console } = require('../providers');

const log = new Logger(console.table);

module.exports = async () => {
  const currentDirContents = await readdir(cwd, { withFileTypes: true, recursive: true });

  log.info(currentDirContents);
};
