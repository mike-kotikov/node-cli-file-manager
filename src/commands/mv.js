const { createReadStream, createWriteStream } = require('node:fs');
const { rm } = require('node:fs/promises');
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

    fileReadStream.on('end', async () => {
      await rm(readPath);
    });
  } catch (err) {
    throw new OperationError(getErrorMessageByErrorCode(err.code));
  }
};
