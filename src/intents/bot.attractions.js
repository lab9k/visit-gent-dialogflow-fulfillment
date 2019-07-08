/* eslint-disable no-underscore-dangle */
const { Suggestion } = require('dialogflow-fulfillment');

module.exports = {
  key: 'bot.attractions',
  handler(agent) {
    agent.add('Choose a category: ');
    agent.add(new Suggestion('Place to stay'));
    agent.add(new Suggestion('Food and drinks'));
    agent.add(new Suggestion('Things to see/do'));
  },
};
