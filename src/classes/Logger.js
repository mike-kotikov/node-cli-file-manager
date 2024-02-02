const COLORS = {
  RESET: '\x1b[0m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m'
};

class Logger {
  #log;
  #color;
  #message;

  scope;
  subScope;

  constructor(logFunc) {
    this.#log = logFunc;
  }

  #logMessage(value) {
    try {
      this.#message = JSON.stringify(value, null, 2);
    } catch (err) {
      return;
    }

    if (this.#message.length) {
      this.#log(
        `${[this.scope, this.subScope].filter(Boolean).concat('').join(':')} ${this.#color} ${
          this.#message
        }`
      );
    }
  }

  info(arg) {
    this.#color = COLORS.BLUE;
    this.#logMessage(arg);
  }

  warn(arg) {
    this.#color = COLORS.YELLOW;
    this.#logMessage(arg);
  }

  error(arg) {
    this.#color = COLORS.RED;
    this.#logMessage(arg);
  }

  success(arg) {
    this.#color = COLORS.GREEN;
    this.#logMessage(arg);
  }

  debug(arg) {
    this.#color = '';
    this.#logMessage(arg);
  }
}

module.exports = Logger;
