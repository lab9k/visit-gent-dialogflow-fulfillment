/* eslint-disable no-underscore-dangle */
const { Suggestion } = require('dialogflow-fulfillment');
const i18n = require('i18n');

module.exports = {
  key: 'bot.activities',
  handler(agent) {
    agent.add(new Suggestion(`${i18n.__('Events')}`));
    agent.add(new Suggestion(i18n.__('Attractions')));
    agent.add(new Suggestion({
      title: `${i18n.__('What kind of activity would you like to do')}?`,
      platform: 'FACEBOOK',
    }));
  },
};
