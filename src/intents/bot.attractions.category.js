/* eslint-disable no-underscore-dangle */
const { fetchAttractions } = require('../../api/SparqlApi');
const AttractionCard = require('../models/AttractionCard');

module.exports = {
  key: 'bot.attractions.category',
  handler(agent) {
    agent.add('Category received');
    const fetched = fetchAttractions(agent.parameters.category);
    return fetched.then((res) => {
      // return top 3 events
      let i;
      let card;
      for (i = 0; i < res.length; i += 1) {
        card = new AttractionCard(res[i]);
        agent.add(card);
      }
    });
  },
};
