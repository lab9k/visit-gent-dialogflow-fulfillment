/* eslint-disable no-underscore-dangle */
const { Suggestion } = require('dialogflow-fulfillment');
const i18n = require('i18n');

module.exports = {
  key: 'bot.attractions',
  handler(agent) {
    agent.add(`${i18n.__('What kind of activity would you like to do')}?`);
    // agent.add(new Suggestion(`${i18n.__('Events')} ${agent.context.get('time').parameters.time}`));
    agent.add(new Suggestion(`${i18n.__('Events')}`));
    agent.add(new Suggestion(i18n.__('Attraction')));

    // const { time } = agent.context.get('time').parameters;
    // agent.context.delete();
    const context = { name: 'time', lifespan: 2, parameters: 'today' };
    agent.context.set(context);
  },
};
