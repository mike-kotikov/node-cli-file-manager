const { resolve: pathResolve } = require('node:path');

module.exports = (currentPath, ...paths) => pathResolve(currentPath, ...paths);
