/* eslint-disable no-underscore-dangle */
const i18n = require('i18n');
const { fetchAttractions } = require('../../api/SparqlApi');
const AttractionCard = require('../models/AttractionCard');


module.exports = {
  key: 'bot.attractions.subject',
  handler(agent) {
    const fetchedAttractions = fetchAttractions(agent.context
      .get('botattractionssubject-followup').parameters.subject);
    return fetchedAttractions.then((res) => {
      if (res.length < 1) {
        agent.add(i18n.__('No attractions found'));
      } else {
        let i;
        let card;
        agent.add(`Looking for ${agent.context
          .get('botattractionssubject-followup').parameters.subject}`);
        for (i = 0; i < res.length && i < 10; i += 1) {
          card = new AttractionCard(res[i]);
          agent.add(card);
        }
      }
    }).catch(agent.add('Something went wrong. Please try again later.'));
  },
};
