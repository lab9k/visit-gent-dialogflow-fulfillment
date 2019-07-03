const { WebhookClient } = require('dialogflow-fulfillment');

function events(agent) {
  agent.add('I will look for events now');
}

const intentMap = new Map();
intentMap.set('bot.events', events);


module.exports = (request, response) => {
  const agent = new WebhookClient({ request, response });
  agent.handleRequest(intentMap);
};
