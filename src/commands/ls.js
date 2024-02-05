const { readdir } = require('node:fs/promises');

const Logger = require('../classes/Logger');
const { console } = require('../providers');

const log = new Logger(console.table);

const FILE_TYPE = {
  DIR: 'directory',
  FILE: 'file',
  OTHER: 'other'
};

module.exports = fm => async () => {
  const currentDirContents = await readdir(fm.cwd, { withFileTypes: true });

  log.pure(
    currentDirContents
      .map(object => ({
        Name: object.name,
        Type: object.isDirectory()
          ? FILE_TYPE.DIR
          : object.isFile()
          ? FILE_TYPE.FILE
          : FILE_TYPE.OTHER
      }))
      .sort((a, b) => {
        if (a.Type === FILE_TYPE.DIR && b.Type !== FILE_TYPE.DIR) {
          return -1;
        } else if (a.Type !== FILE_TYPE.DIR && b.Type === FILE_TYPE.DIR) {
          return 1;
        } else {
          // Alphabetical sort for both directories and files
          return a.Name.toLowerCase().localeCompare(b.Name.toLowerCase());
        }
      })
  );
};
