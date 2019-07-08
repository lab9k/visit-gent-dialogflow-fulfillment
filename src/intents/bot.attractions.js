/* eslint-disable no-underscore-dangle */
const { Suggestion } = require('dialogflow-fulfillment');
const i18n = require('i18n');


module.exports = {
  key: 'bot.attractions',
  handler(agent) {
    agent.add(i18n.__('Looking for attractions'));

    // Example of choosing a category
    agent.add('Choose a category: ');
    agent.add(new Suggestion('Place to stay'));
    agent.add(new Suggestion('Food and drinks'));
    agent.add(new Suggestion('Things to see'));
  },
};
