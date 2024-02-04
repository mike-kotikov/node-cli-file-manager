const { chdir } = require('node:process');

const OperationError = require('../classes/OperationError');
const getErrorMessageByErrorCode = require('../helpers/getErrorMessageByErrorCode');
const getAbsolutePath = require('../helpers/getAbsolutePath');
const isPathOutsideHomeDir = require('../helpers/isPathOutsideHomeDir');

module.exports = fm => () => {
  try {
    const absolutePath = getAbsolutePath(fm.cwd, '..');

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
