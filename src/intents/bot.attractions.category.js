/* eslint-disable no-underscore-dangle */
const { fetchAttractions } = require('../../api/SparqlApi');
const AttractionCard = require('../models/AttractionCard');

function getCategoryText(category) {
  switch (category) {
    case 'stay':
      return 'places to stay';
    case 'eat_drink':
      return 'places to eat or drink something';
    case 'see_do':
      return 'places to see';
    default:
      return '';
  }
}

module.exports = {
  key: 'bot.attractions.category',
  handler(agent) {
    const fetched = fetchAttractions(agent.parameters.category);
    return fetched.then((res) => {
      // return top 3 attractions
      if (res.length < 1) {
        agent.add('No attractions found');
      } else {
        let i;
        let card;
        agent.add(`Top 3 ${getCategoryText(agent.parameters.category)}: `);
        for (i = 0; i < res.length; i += 1) {
          card = new AttractionCard(res[i]);
          agent.add(card);
        }
      }
    });
  },
};
