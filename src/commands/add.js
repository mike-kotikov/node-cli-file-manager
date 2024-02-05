const { writeFile } = require('node:fs/promises');

const OperationError = require('../classes/OperationError');
const getErrorMessageByErrorCode = require('../helpers/getErrorMessageByErrorCode');
const getAbsolutePath = require('../helpers/getAbsolutePath');

module.exports = fm => async fileName => {
  try {
    await writeFile(getAbsolutePath(fm.cwd, fileName), '');
  } catch (err) {
    throw new OperationError(getErrorMessageByErrorCode(err.code));
  }
};
