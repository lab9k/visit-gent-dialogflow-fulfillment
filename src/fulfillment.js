const { WebhookClient } = require('dialogflow-fulfillment');
const i18n = require('i18n');

const intents = require('./intents');

module.exports = (request, response) => {
  const agent = new WebhookClient({ request, response });
  i18n.setLocale(agent.locale);
  console.log(i18n.getLocale());
  agent.handleRequest(intents);
};
