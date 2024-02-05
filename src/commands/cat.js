const { createReadStream } = require('node:fs');
const { pipeline } = require('node:stream/promises');

const OperationError = require('../classes/OperationError');
const getAbsolutePath = require('../helpers/getAbsolutePath');
const getErrorMessageByErrorCode = require('../helpers/getErrorMessageByErrorCode');
const { stream } = require('../providers');

// TODO: fix EPIPE error after cat operation
module.exports = fm => async pathToFile => {
  try {
    const fileReadStream = createReadStream(getAbsolutePath(fm.cwd, pathToFile), {
      encoding: 'utf8'
    });

    fileReadStream.on('end', () => {
      fileReadStream.close();
    });

    await pipeline(fileReadStream, stream.console.output);
  } catch (err) {
    throw new OperationError(getErrorMessageByErrorCode(err.code));
  }
};
