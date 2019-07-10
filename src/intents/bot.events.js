/* eslint-disable no-underscore-dangle */
const i18n = require('i18n');
const { Payload } = require('dialogflow-fulfillment');
const { fetchEvents } = require('../../api/SparqlApi');
const EventCard = require('../models/EventCard');

function list() {
  const facebookJson = {
    template_type: 'list',
    top_element_style: 'compact',
    elements: [
      {
        title: 'Classic T-Shirt Collection',
        subtitle: 'See all our colors',
        image_url: 'https://peterssendreceiveapp.ngrok.io/img/collection.png',
        buttons: [
          {
            title: 'View',
            type: 'web_url',
            url: 'https://peterssendreceiveapp.ngrok.io/collection',
            messenger_extensions: true,
            webview_height_ratio: 'tall',
            fallback_url: 'https://peterssendreceiveapp.ngrok.io/',
          },
        ],
      },
    ],
  };

  const payload = new Payload(
    'facebook',
    facebookJson,
    true,
    true,
  );

  return payload;
}

module.exports = {
  key: 'bot.events',
  handler(agent) {
    agent.add(i18n.__('Looking for events'));
    agent.add(`List: ${list()}`);
    const fetched = fetchEvents(agent.parameters.time);
    return fetched.then((res) => {
      // return top 3 events

      if (res.length < 1) {
        agent.add('No events found');
      } else {
        agent.add(`${i18n.__('Top 3 events')} ${i18n.__(agent.parameters.time)}: `);
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
