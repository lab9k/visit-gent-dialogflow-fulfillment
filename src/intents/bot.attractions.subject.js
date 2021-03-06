/* eslint-disable no-underscore-dangle */
const { Suggestion } = require('dialogflow-fulfillment');
const i18n = require('i18n');


module.exports = {
  key: 'bot.activities',
  handler(agent) {
    // It's important for Facebook Messenger that the suggestions are added before the question
    agent.add(new Suggestion(i18n.__('Yes')));
    agent.add(new Suggestion(i18n.__('No')));
    agent.add(`${i18n.__('Would you like to provide a location')}?`);
  },
};
