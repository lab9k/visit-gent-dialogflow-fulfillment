/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const i18n = require('i18n');
const { fetchEvents } = require('../api/SparqlApi');
const EventCard = require('../models/EventCard');

module.exports = {
  key: 'bot.events',
  handler(agent) {
    console.log(agent.context.get('time'));
    console.log(agent.parameters.eventTime);

    if ((agent.context.get('time') === undefined || agent.context.get('time').parameters.time === '') && agent.parameters.eventTime === '') {
      agent.add('What day are you looking for events?');
    } else {
      let time;
      if (agent.parameters.eventTime !== '') {
        time = agent.parameters.eventTime;
      } else {
        ({ time } = agent.context.get('time').parameters);
      }
      const fetched = fetchEvents(time);
      return fetched.then((res) => {
        console.log(time);
        // return top 3 events
        if (res.length < 1) {
          agent.add(i18n.__('No events found'));
        } else {
          agent.add(`${i18n.__('Top 3 events')}: `);
          agent.add('Test1');
          agent.add('Test2');
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
