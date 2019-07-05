/* eslint-disable no-underscore-dangle */
const { Suggestion } = require('dialogflow-fulfillment');
const i18n = require('i18n');
const fetch = require('../../api/SparqlApi');
const AttractionCard = require('../models/AttractionCard');

module.exports = {
  key: 'bot.attractions',
  handler(agent) {
    agent.add(i18n.__('Looking for attractions'));
    agent.add(new Suggestion('Nightlife'));
    agent.add(new Suggestion('Museums'));
    agent.add(new Suggestion('Food'));
    const fetched = fetch('bot.attractions', agent.parameters.time);
    return fetched.then((res) => {
      // return top 3 events
      agent.add(`${i18n.__('Top 3 attractions')}: `);
      let i;
      let card;
      for (i = 0; i < 3; i += 1) {
        card = new AttractionCard(res[i]);
        agent.add(card);
      }
    });
  },
};
