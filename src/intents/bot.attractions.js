/* eslint-disable no-underscore-dangle */
const { Suggestion } = require('dialogflow-fulfillment');
const i18n = require('i18n');
/* const fetch = require('../../api/SparqlApi');
const AttractionCard = require('../models/AttractionCard'); */

module.exports = {
  key: 'bot.attractions',
  handler(agent) {
    agent.add(i18n.__('Looking for attractions'));

    // Example of choosing a category
    agent.add('Choose a category: ');
    agent.add(new Suggestion('Nightlife'));
    agent.add(new Suggestion('Culture'));
    agent.add(new Suggestion('Food'));

    /* const fetched = fetch('bot.attractions', null);
    return fetched.then((res) => {
      // return top 3 events
      if (res.length > 3) {
        agent.add(`${i18n.__('Top 3 attractions')}: `);
      }
      let i;
      let card;
      for (i = 0; i < 3; i += 1) {
        card = new AttractionCard(res[i]);
        agent.add(card);
      }
    }); */
  },
};
