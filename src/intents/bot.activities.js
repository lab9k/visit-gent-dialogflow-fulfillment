/* eslint-disable no-underscore-dangle */
const { Suggestion } = require('dialogflow-fulfillment');
const i18n = require('i18n');

module.exports = {
  key: 'bot.activities',
  handler(agent) {
    const quickReplies = new Suggestion({
      title: `${i18n.__('What kind of activity would you like to do')}?`,
    });
    quickReplies.addReply_(i18n.__('Events'));
    quickReplies.addReply_(i18n.__('Attractions'));
    agent.add(quickReplies);
  },
};
