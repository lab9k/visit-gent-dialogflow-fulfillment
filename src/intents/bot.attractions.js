const Suggestion = require('dialogflow-fulfillment');
const fetch = require('../../api/SparqlApi');
const AttractionCard = require('../models/AttractionCard');

module.exports = {
  key: 'bot.attractions',
  handler(agent) {
    agent.add('Looking for attractions.');
    agent.add(new Suggestion('Nightlife'));
    const fetched = fetch('bot.attractions', agent.parameters.time);
    return fetched.then((res) => {
      // return top 3 events
      agent.add('Top 3 attractions: ');
      let i;
      let card;
      for (i = 0; i < 3; i += 1) {
        card = new AttractionCard(res[i]);
        agent.add(card);
      }
    });
  },
};
