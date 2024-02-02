module.exports = {
  welcomeMessage: username => `Welcome to the File Manager, ${username}!`,
  goodbyeMessage: username => `Thank you for using File Manager, ${username}, goodbye!`,
  statusMessage: cwd => `You are currently in ${cwd}`,

  exitCode: '.exit'

  /* Other options:
   * - cwd (directory that is opened at startup)
   */
};
