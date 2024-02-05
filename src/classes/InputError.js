class InputError extends Error {
  static prefix = 'Invalid input';

  constructor(message) {
    super(message ? `${InputError.prefix}: ${message}` : InputError.prefix);
    this.name = 'InputError';
  }
}

module.exports = InputError;
