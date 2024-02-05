const { rm } = require('node:fs/promises');

const OperationError = require('../classes/OperationError');
const getErrorMessageByErrorCode = require('../helpers/getErrorMessageByErrorCode');
const getAbsolutePath = require('../helpers/getAbsolutePath');

module.exports = fm => async pathToFile => {
  try {
    await rm(getAbsolutePath(fm.cwd, pathToFile));
  } catch (err) {
    throw new OperationError(getErrorMessageByErrorCode(err.code));
  }
};
