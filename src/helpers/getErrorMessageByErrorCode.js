module.exports = errorCode => {
  switch (errorCode) {
    case 'EEXIST':
      return 'File Already Exists';
    case 'ENOENT':
      return 'No Such File Or Directory';
    case 'EACCES':
      return 'Permission Denied';
    case 'EISDIR':
      return 'Expected a file, but the given pathname was a directory';
    case 'ENOTDIR':
      return 'Not a directory';
    case 'ENOTEMPTY':
      return 'Directory not empty';
    case 'EPERM':
      return 'Operation not permitted';
    case 'EPIPE':
      return 'Broken pipe';
    default:
      return 'Unknown Error';
  }
};
