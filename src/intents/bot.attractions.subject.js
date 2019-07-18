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
      let i;
      let card;
      if (res.length < 1) {
        agent.add(i18n.__('No attractions found'));
      } else {
        agent.add(`Looking for ${agent.context
          .get('botattractionssubject-followup').parameters.subject}`);
        for (i = 0; i < res.length; i += 1) {
          card = new AttractionCard(res[i]);
          agent.add(card);
        }
      }
    });
  },
};
