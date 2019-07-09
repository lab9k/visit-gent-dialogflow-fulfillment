/* eslint-disable no-underscore-dangle */
const { Suggestion } = require('dialogflow-fulfillment');
const i18n = require('i18n');

module.exports = {
  key: 'bot.attractions',
  handler(agent) {
    agent.add('What kind of activity would you like to do?');
    agent.add(new Suggestion(i18n.__('Event')));
    agent.add(new Suggestion(i18n.__('Attraction')));
    console.log(agent.context.get('time'));
    agent.context.set(agent.context.get('time'));
  },
};
