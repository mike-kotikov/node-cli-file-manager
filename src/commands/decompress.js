const { createBrotliDecompress, constants } = require('node:zlib');
const { createReadStream, createWriteStream, statSync } = require('node:fs');
const { pipeline } = require('node:stream/promises');

const InputError = require('../classes/InputError');
const OperationError = require('../classes/OperationError');
const getAbsolutePath = require('../helpers/getAbsolutePath');
const getErrorMessageByErrorCode = require('../helpers/getErrorMessageByErrorCode');

module.exports = fm => async (fileToDecompressPath, outputFilePath) => {
  if (!fileToDecompressPath || !outputFilePath) {
    throw new InputError('Invalid arguments provided.');
  }

  try {
    const fileToDecompressAbsolutePath = getAbsolutePath(fm.cwd, fileToDecompressPath);
    const fileReadStream = createReadStream(fileToDecompressAbsolutePath);

    const archiveStream = createBrotliDecompress();

    const fileWriteStream = createWriteStream(getAbsolutePath(fm.cwd, outputFilePath), {
      encoding: 'utf8'
    });

    await pipeline(fileReadStream, archiveStream, fileWriteStream);
  } catch (err) {
    throw new OperationError(getErrorMessageByErrorCode(err.code));
  }
};
