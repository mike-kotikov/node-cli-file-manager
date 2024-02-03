const { chdir, cwd } = require('node:process');

const OperationError = require('../classes/OperationError');
const getErrorMessageByErrorCode = require('../helpers/getErrorMessageByErrorCode');
const getAbsolutePath = require('../helpers/getAbsolutePath');
const isPathOutsideHomeDir = require('../helpers/isPathOutsideHomeDir');

module.exports = path => {
  try {
    const absolutePath = getAbsolutePath(cwd(), path);

    if (!isPathOutsideHomeDir(absolutePath)) {
      chdir(absolutePath);
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new OperationError(getErrorMessageByErrorCode(err.code));
    }

    throw err;
  }
};
