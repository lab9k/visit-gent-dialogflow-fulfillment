/* eslint-disable no-underscore-dangle */
const i18n = require('i18n');
const { fetchAttractions } = require('../api/SparqlApi');
const AttractionCard = require('../models/AttractionCard');


module.exports = {
  key: 'bot.attractions.subject.no',
  handler(agent) {
    const { subject } = agent.context.get('botattractionssubject-followup').parameters;

    // fetch attractions for given subject
    const fetchedAttractions = fetchAttractions(subject);

    return fetchedAttractions.then((res) => {
      // checks if the result is empty
      if (res.length < 1) {
        agent.add(i18n.__('No attractions found'));
      } else {
        let i;
        let card;
        agent.add(`${i18n.__('Tourist attractions found')}:`);
        // returns the attractions
        for (i = 0; i < res.length && i < 10; i += 1) {
          card = new AttractionCard(res[i]);
          agent.add(card);
        }
      }
    });
  },
};
