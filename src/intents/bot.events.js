const fetchCityLeader = require('../../api/SparqlApi');


module.exports = {
  key: 'bot.events',
  handler(agent) {
    // agent.add('Received your request for events successfully!');
    fetchCityLeader('Vienna').then(leader => agent.add(`${leader} is a leader of Vienna`));
  },
};
