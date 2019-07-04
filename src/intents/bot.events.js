const fetch = require('../../api/SparqlApi');


module.exports = {
  key: 'bot.events',
  handler(agent) {
    agent.add('Received your request for events successfully!');
    fetch().then(res => agent.add(res));
    // agent.add(`Events: ${fetch()}`);
  },
};
