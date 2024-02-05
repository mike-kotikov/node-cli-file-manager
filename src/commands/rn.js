const { rename } = require('node:fs/promises');

const OperationError = require('../classes/OperationError');
const getErrorMessageByErrorCode = require('../helpers/getErrorMessageByErrorCode');
const getAbsolutePath = require('../helpers/getAbsolutePath');

module.exports = fm => async (oldFileName, newFileName) => {
  try {
    await rename(getAbsolutePath(fm.cwd, oldFileName), getAbsolutePath(fm.cwd, newFileName));
  } catch (err) {
    throw new OperationError(getErrorMessageByErrorCode(err.code));
  }
};
