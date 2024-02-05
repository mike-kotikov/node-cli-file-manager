const { createHash } = require('node:crypto');
const { createReadStream } = require('node:fs');

const Logger = require('../classes/Logger');
const OperationError = require('../classes/OperationError');
const getErrorMessageByErrorCode = require('../helpers/getErrorMessageByErrorCode');
const getAbsolutePath = require('../helpers/getAbsolutePath');
const { console } = require('../providers');

const hash = createHash('sha256');
const log = new Logger(console.log);

module.exports = fm => async pathToFile => {
  try {
    let hashResultResolve;
    const hashResult = new Promise(resolve => {
      hashResultResolve = resolve;
    });
    const fileReadStream = createReadStream(getAbsolutePath(fm.cwd, pathToFile), {
      encoding: 'utf8'
    });

    fileReadStream.on('readable', () => {
      const content = fileReadStream.read();

      if (content) {
        hash.update(content);
      } else {
        hashResultResolve(hash.digest('hex'));
        fileReadStream.close();
      }
    });

    log.info(`File hash: ${await hashResult}`);
  } catch (err) {
    throw new OperationError(getErrorMessageByErrorCode(err.code));
  }
};
