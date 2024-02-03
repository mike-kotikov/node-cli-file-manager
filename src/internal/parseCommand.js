module.exports = input => {
  const [command, ...args] = input.split(' ');

  return { command, args };
};
