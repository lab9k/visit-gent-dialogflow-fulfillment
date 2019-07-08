/* eslint-disable no-underscore-dangle */
const i18n = require('i18n');
const fetchAttractions = require('../../api/SparqlApi');
const AttractionCard = require('../models/AttractionCard');

module.exports = {
  key: 'bot.attractions.category',
  handler(agent) {
    agent.add('Category received');
    const fetched = fetchAttractions(agent.parameters.category);
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
    });
  },
};
