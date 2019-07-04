const fetch = require('../../api/SparqlApi');
const EventCard = require('../models/EventCard');

module.exports = {
  key: 'bot.events',
  handler(agent) {
    agent.add('Received your request for events successfully!');
    fetch();
    const fetched = fetch();
    return fetched.then((res) => {
      console.log('bot.events: result', res);
      const card = new EventCard(res);
      agent.add(card);
    });
  },
};
