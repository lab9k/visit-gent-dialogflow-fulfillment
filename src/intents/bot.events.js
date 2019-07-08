/* eslint-disable no-underscore-dangle */
const i18n = require('i18n');
const fetchEvents = require('../../api/SparqlApi');
const EventCard = require('../models/EventCard');

module.exports = {
  key: 'bot.events',
  handler(agent) {
    agent.add(i18n.__('Looking for events'));
    const fetched = fetchEvents(agent.parameters.time);
    return fetched.then((res) => {
      // return top 3 events
      if (res.length > 3) {
        agent.add(`${i18n.__('Top 3 events')} ${agent.parameters.time}: `);
      }
      let i;
      let card;
      console.log(res);
      for (i = 0; i < 3 && i < res.length; i += 1) {
        card = new EventCard(res[i]);
        agent.add(card);
      }
    });
  },
};
