/* eslint-disable no-underscore-dangle */
const i18n = require('i18n');

module.exports = {
  key: 'bot.attractions.subject.yes',
  handler(agent) {
    agent.add(`${i18n.__('Provide a location please')}?`);
  },
};
