const fetchCityLeader = require('../../api/SparqlApi');


module.exports = {
  key: 'bot.events',
  handler(agent) {
    agent.add('Received your request for events successfully!');
    agent.add(fetchCityLeader('Vienna'));
  },
};
