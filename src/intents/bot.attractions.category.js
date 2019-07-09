/* eslint-disable no-underscore-dangle */
const i18n = require('i18n');
const { fetchAttractions } = require('../../api/SparqlApi');
const AttractionCard = require('../models/AttractionCard');

function getCategoryText(category) {
  switch (category) {
    case 'stay':
      return i18n.__('stay');
    case 'eat_drink':
      return i18n.__('eat_drink');
    case 'see_do':
      return i18n.__('see_do');
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
