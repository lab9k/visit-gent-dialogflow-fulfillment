/* eslint-disable no-underscore-dangle */
const i18n = require('i18n');
const { fetchEvents } = require('../../api/SparqlApi');
const EventCard = require('../models/EventCard');
// const activities = require('./bot.activities');

module.exports = {
  key: 'bot.events',
  handler(agent) {
    agent.add(i18n.__('Looking for events'));
    console.log(agent.context.get('time'));
    if (agent.context.get('time').parameters.time === '') {
      agent.add('What day are you looking for events?');
      return null;
    }
    agent.add(agent.parameters.time);
    let time;
    if (agent.context.get('time').parameters.time !== '') {
      time = agent.context.get('time').parameters;
    } else {
      time = agent.parameters;
    }
    const fetched = fetchEvents(time);
    return fetched.then((res) => {
      // return top 3 events
      if (res.length < 1) {
        agent.add(i18n.__('No events found'));
      } else {
        agent.add(`${i18n.__('Top 3 events')}: `);
        let i;
        let card;
        for (i = 0; i < res.length; i += 1) {
          card = new EventCard(res[i]);
          agent.add(card);
        }
      }
    });
  },
};
