/* eslint-disable no-underscore-dangle */
const { Permission } = require('actions-on-google');

module.exports = {
  key: 'bot.location',
  handler(agent) {
    agent.data.requestedPermission = 'DEVICE_PRECISE_LOCATION';
    return agent.ask(new Permission({
      context: 'to locate you',
      permissions: agent.data.requestedPermission,
    }));
  },
};
