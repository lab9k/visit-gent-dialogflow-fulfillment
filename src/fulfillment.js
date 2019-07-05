const { WebhookClient } = require('dialogflow-fulfillment');

const intents = require('./intents');

module.exports = (request, response) => {
  console.log(request.languageCode);
  const agent = new WebhookClient({ request, response });
  agent.handleRequest(intents);
};
