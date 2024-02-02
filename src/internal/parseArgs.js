const process = require('node:process');

const util = require('../helpers/util');

const ARG_PREFIX_REG_EXP = new RegExp('^--[a-zA-Z].*'); // An argument should start with two dashes, followed by a letter (ex: '--argument')

const SUPPORTED_ARGS = ['username'];

module.exports = () =>
  process.argv
    .filter(arg => ARG_PREFIX_REG_EXP.test(arg))
    .reduce((acc, arg) => {
      const [key, value] = arg.slice(2).split('=');

      // Keep only known arguments
      if (SUPPORTED_ARGS.includes(key)) {
        acc[key] = util.normalizeStringValue(value);
      }

      return acc;
    }, {});
