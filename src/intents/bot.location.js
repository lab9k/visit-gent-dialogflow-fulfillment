/* eslint-disable no-underscore-dangle */

module.exports = {
  key: 'bot.location',
  handler(agent) {
    agent.ask('DEVICE_PRECISE_LOCATION');
  },
};
