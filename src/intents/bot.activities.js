/* eslint-disable no-underscore-dangle */
const { Suggestion } = require('dialogflow-fulfillment');
const i18n = require('i18n');

module.exports = {
  key: 'bot.attractions',
  handler(agent) {
    agent.add(`${i18n.__('What kind of activity would you like to do')}?`);
    agent.add(new Suggestion(i18n.__('Event')));
    agent.add(new Suggestion(i18n.__('Attraction')));
  },
};
