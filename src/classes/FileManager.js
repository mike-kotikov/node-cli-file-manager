const process = require('node:process');
const { homedir } = require('node:os');
const {} = require('node:fs/promises');

const { console } = require('../providers');
const { input, output, parseArgs } = require('../internal');
const defaultConfig = require('../config/default');
const Logger = require('./Logger');

class FileManager {
  #config;
  #args;
  #log;

  #debugMode = false;

  constructor(config = {}) {
    this.#config = { ...defaultConfig, ...config };
  }

  get #cwd() {
    return process.cwd();
  }

  #init() {
    this.#args = parseArgs();
    this.#log = new Logger(console.log);

    process.chdir(this.#config.cwd || homedir());

    if (this.#args.debug) {
      this.#debugMode = true;
    }

    process.on('SIGINT', () => this.exit());
  }

  #debug(scope, message) {}

  launch() {
    this.#init();

    this.#log.info(this.#config.welcomeMessage(this.#args.username));
    this.#log.info(this.#config.statusMessage(this.#cwd));

    input.console.on('data', userInput => {
      const command = userInput.toString().trim();
      this.#log.debug(command);

      if (command === this.#config.exitCode) {
        this.exit();
      }
    });
  }

  exit() {
    this.#log.info(this.#config.goodbyeMessage(this.#args.username));

    process.exit();
  }
}

module.exports = FileManager;
