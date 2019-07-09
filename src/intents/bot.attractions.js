/* eslint-disable no-underscore-dangle */
const { Suggestion } = require('dialogflow-fulfillment');
const i18n = require('i18n');

module.exports = {
  key: 'bot.attractions',
  handler(agent) {
    agent.add(`${i18n.__('Choose a category')}: `);
    agent.add(new Suggestion(i18n.__('Place to stay')));
    agent.add(new Suggestion(i18n.__('Food and drinks')));
    agent.add(new Suggestion(i18n.__('Things to see/do')));
  },
};
