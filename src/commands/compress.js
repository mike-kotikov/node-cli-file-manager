const { createBrotliCompress, constants } = require('node:zlib');
const { createReadStream, createWriteStream, statSync } = require('node:fs');
const { pipeline } = require('node:stream/promises');

const OperationError = require('../classes/OperationError');
const InputError = require('../classes/InputError');
const getAbsolutePath = require('../helpers/getAbsolutePath');
const getErrorMessageByErrorCode = require('../helpers/getErrorMessageByErrorCode');

module.exports = fm => async (fileToCompressPath, outputFilePath) => {
  if (!fileToCompressPath || !outputFilePath) {
    throw new InputError('Invalid arguments provided.');
  }

  try {
    const fileToCompressAbsolutePath = getAbsolutePath(fm.cwd, fileToCompressPath);
    const fileReadStream = createReadStream(fileToCompressAbsolutePath, {
      encoding: 'utf8'
    });

    const archiveStream = createBrotliCompress({
      chunkSize: 32 * 1024,
      params: {
        [constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT,
        [constants.BROTLI_PARAM_QUALITY]: 4,
        [constants.BROTLI_PARAM_SIZE_HINT]: statSync(fileToCompressAbsolutePath).size
      }
    });

    const fileWriteStream = createWriteStream(getAbsolutePath(fm.cwd, outputFilePath));

    await pipeline(fileReadStream, archiveStream, fileWriteStream);
  } catch (err) {
    throw new OperationError(getErrorMessageByErrorCode(err.code));
  }
};
