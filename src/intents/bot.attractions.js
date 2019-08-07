/* eslint-disable no-underscore-dangle */
const i18n = require('i18n');

module.exports = {
  key: 'bot.attractions.subject',
  handler(agent) {
    agent.add(`${i18n.__('What kind of attraction are you looking for')}?`);
  },
};
