const fetch = require('../../api/SparqlApi');
const EventCard = require('../models/EventCard');

module.exports = {
  key: 'bot.events',
  handler(agent) {
    agent.add('Looking for events.');
    const fetched = fetch(agent.parameters.time);
    return fetched.then((res) => {
      let i;
      agent.add(`Top 3 events ${agent.parameters.time}: `);
      // return top 3 events
      for (i = 0; i < 3; i += 1) {
        const card = new EventCard(res[i]);
        agent.add(card);
      }
      /* res.forEach((element) => {
        const card = new EventCard(element);
        agent.add(card);
      }); */
    });
  },
};
