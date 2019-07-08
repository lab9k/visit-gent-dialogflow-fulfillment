/* eslint-disable no-underscore-dangle */

const i18n = require('i18n');

module.exports = {
  key: 'bot.attractions',
  handler(agent) {
    agent.add(i18n.__('Looking for attractions'));
  },
};
