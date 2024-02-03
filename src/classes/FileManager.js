const { homedir } = require('node:os');
const process = require('node:process');

const commands = require('../commands');
const { console } = require('../providers');
const { input, output, parseArgs, parseCommand } = require('../internal');
const defaultConfig = require('../config/default');

const InputError = require('./InputError');
const Logger = require('./Logger');
const OperationError = require('./OperationError');
const getErrorMessageByErrorCode = require('../helpers/getErrorMessageByErrorCode');

const availableCommands = Object.keys(commands);
const knownErrors = [InputError, OperationError];

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

  async #executeCommand(parsedInput) {
    const { command, args } = parseCommand(parsedInput);

    if (command && !availableCommands.includes(command)) {
      throw new InputError(`Unsupported command "${command}"`);
    }

    await commands[command](...args);
  }

  launch() {
    this.#init();

    this.#log.info(this.#config.welcomeMessage(this.#args.username));
    this.#log.info(this.#config.statusMessage(this.#cwd));

    input.console.on('data', async userInput => {
      try {
        const parsedInput = userInput.toString().trim();
        this.#debug('Received input:', parsedInput);

        if (parsedInput === this.#config.exitCode) {
          this.exit();
        }

        await this.#executeCommand(parsedInput);
      } catch (err) {
        if (!knownErrors.some(knownError => err instanceof knownError)) {
          this.#log.error(
            err.code
              ? getErrorMessageByErrorCode(err.code)
              : 'Unexpected Error ocurred: Please verify your input and try again.'
          );
          this.#debug('Execution', err.message);
        } else {
          this.#log.error(err.message);
        }
      } finally {
        this.#log.info(this.#config.statusMessage(this.#cwd));
      }
    });
  }

  exit() {
    this.#log.info(this.#config.goodbyeMessage(this.#args.username));

    process.exit();
  }
}

module.exports = FileManager;
