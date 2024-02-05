const { createReadStream, createWriteStream } = require('node:fs');
const { basename } = require('node:path');

const OperationError = require('../classes/OperationError');
const getErrorMessageByErrorCode = require('../helpers/getErrorMessageByErrorCode');
const getAbsolutePath = require('../helpers/getAbsolutePath');

module.exports = fm => (fromPath, toPath) => {
  try {
    const readPath = getAbsolutePath(fromPath);
    const fileName = basename(readPath);
    const fileReadStream = createReadStream(readPath);
    const writePath = getAbsolutePath(toPath, fileName);
    const fileWriteStream = createWriteStream(writePath);

    fileReadStream.pipe(fileWriteStream);
  } catch (err) {
    throw new OperationError(getErrorMessageByErrorCode(err.code));
  }
};
