const { WebhookClient } = require('dialogflow-fulfillment');


module.exports = (request, response) => {
  const client = new WebhookClient({ request, response });
  console.log('ping received');
};
