/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const i18n = require('i18n');
const { fetchEvents } = require('../api/SparqlApi');
const EventCard = require('../models/EventCard');

module.exports = {
  key: 'bot.events',
  handler(agent) {
    // DIALOGFLOW SLOT FILLING
    // checks if time is not defined
    if ((agent.context.get('time') === undefined || agent.context.get('time').parameters.time === '') && agent.parameters.eventTime === '') {
      agent.add(`${i18n.__('What day are you looking for events')}?`);
    } else {
      let time;

      // set time = parameter eventTime if not empty
      if (agent.parameters.eventTime !== '') {
        time = agent.parameters.eventTime;
      } else {
        // if parameter is empty set time = context time
        ({ time } = agent.context.get('time').parameters);
      }

      const fetched = fetchEvents(time);
      return fetched.then((res) => {
        // checks if result is empty
        if (res.length < 1) {
          agent.add(i18n.__('No events found'));
        } else {
          // returns 3 events
          agent.add(`${i18n.__('Top 3 events')}: `);
          let i;
          let card;
          for (i = 0; i < res.length; i += 1) {
            card = new EventCard(res[i]);
            agent.add(card);
          }
        }
      });
    }
  },
};
