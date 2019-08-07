/* eslint-disable no-underscore-dangle */
const { Suggestion, Payload } = require('dialogflow-fulfillment');
const i18n = require('i18n');


module.exports = {
  key: 'bot.activities',
  handler(agent) {
    const quickReplies = new Suggestion({
      title: `${i18n.__('What kind of activity would you like to do')}?`,
    });
    // quickReplies.addReply_(i18n.__('Events'));
    // quickReplies.addReply_(i18n.__('Attractions'));
    // agent.add(quickReplies);
    const reply = {
      messages: [
        {
          platform: 'facebook',
          replies: [
            'Quick reply 1',
            'Quick reply 2',
            'Quick reply 3',
          ],
          title: 'Quick Reply Title',
          type: 2,
        },
      ],
    };

    agent.requestSource = agent.PLATFORM_UNSPECIFIED;
    agent.add(new Payload('PLATFORM_UNSPECIFIED', reply));
  },
};
