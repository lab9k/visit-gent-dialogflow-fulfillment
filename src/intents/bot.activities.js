/* eslint-disable no-underscore-dangle */
const { Suggestion } = require('dialogflow-fulfillment');
const i18n = require('i18n');


module.exports = {
  key: 'bot.activities',
  handler(agent) {
    agent.add(new Suggestion(i18n.__('Event')));
    agent.add(new Suggestion(i18n.__('AttractionsShort')));
    agent.add(`${i18n.__('What kind of activity would you like to do')}?`);
  },
};
