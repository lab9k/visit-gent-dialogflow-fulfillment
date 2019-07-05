/* eslint-disable no-underscore-dangle */
const i18n = require('i18n');
const fetch = require('../../api/SparqlApi');
const EventCard = require('../models/EventCard');

module.exports = {
  key: 'bot.events',
  handler(agent) {
    agent.add(i18n.__('Looking for events'));
    const fetched = fetch('bot.events', agent.parameters.time);
    return fetched.then((res) => {
      // return top 3 events
      agent.add(`${i18n.__('Top 3 events')} ${agent.parameters.time}: `);
      let i;
      let card;
      for (i = 0; i < 3 || i < res.lenght; i += 1) {
        card = new EventCard(res[i]);
        agent.add(card);
      }
    });
  },
};
