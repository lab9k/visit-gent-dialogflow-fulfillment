const fetch = require('../../api/SparqlApi');
const EventCard = require('../models/EventCard');

module.exports = {
  key: 'bot.events',
  handler(agent) {
    agent.add('Looking for events.');
    const fetched = fetch('bot.events', agent.parameters.time);
    return fetched.then((res) => {
      // return top 3 events
      agent.add(`Top 3 events ${agent.parameters.time}: `);
      let i;
      let card;
      for (i = 0; i < 3; i += 1) {
        card = new EventCard(res[i]);
        agent.add(card);
      }
    });
  },
};
