class OperationError extends Error {
  static prefix = 'Operation failed';

  constructor(message) {
    super(message ? `${OperationError.prefix}: ${message}` : OperationError.prefix);
    this.name = 'OperationError';
  }
}

module.exports = OperationError;
