/* eslint-disable no-underscore-dangle */
const { Suggestion } = require('dialogflow-fulfillment');
const i18n = require('i18n');

module.exports = {
  key: 'bot.attractions',
  handler(agent) {
    agent.add('Choose a type of activity: ');
    agent.add(new Suggestion(i18n.__('Event')));
    agent.add(new Suggestion(i18n.__('Attraction')));
  },
};
