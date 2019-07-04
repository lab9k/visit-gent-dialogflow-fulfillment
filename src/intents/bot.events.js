const fetch = require('../../api/SparqlApi');
const EventCard = require('../models/EventCard');

module.exports = {
  key: 'bot.events',
  handler(agent) {
    agent.add('Received your request for events successfully!');
    const fetched = fetch(agent.parameters.time);
    return fetched.then((res) => {
      res.forEach((element) => {
        console.log(element);
        const card = new EventCard(element);
        agent.add(card);
      });
    });
  },
};
