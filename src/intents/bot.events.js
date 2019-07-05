const fetch = require('../../api/SparqlApi');
const EventCard = require('../models/EventCard');

module.exports = {
  key: 'bot.events',
  handler(agent) {
    agent.add('Received your request for events successfully!');
    const fetched = fetch(agent.parameters.time);
    return fetched.then((res) => {
      let i;

      // return top 3 events
      for (i = 0; i < 4; i += 1) {
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
