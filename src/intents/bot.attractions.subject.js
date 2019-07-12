/* eslint-disable no-underscore-dangle */
const { fetchAttractions } = require('../../api/SparqlApi');
const AttractionCard = require('../models/AttractionCard');


module.exports = {
  key: 'bot.attractions.subject',
  handler(agent) {
    const fetched = fetchAttractions('eat_drink', agent.parameters.subject);
    return fetched.then((res) => {
      // return top 3 attractions
      if (res.length < 1) {
        agent.add('No attractions found');
      } else {
        let i;
        let card;
        for (i = 0; i < res.length; i += 1) {
          card = new AttractionCard(res[i]);
          agent.add(card);
        }
      }
    });
  },
};
