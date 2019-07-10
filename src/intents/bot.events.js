/* eslint-disable no-underscore-dangle */
const i18n = require('i18n');
const { Payload } = require('dialogflow-fulfillment');
const { fetchEvents } = require('../../api/SparqlApi');
const EventCard = require('../models/EventCard');

module.exports = {
  key: 'bot.events',
  handler(agent) {
    agent.add(i18n.__('Looking for events'));

    const facebookJson = {
      template_type: 'generic',
      elements: [
        {
          title: 'Welcome!',
          image_url: 'https://petersfancybrownhats.com/company_image.png',
          subtitle: 'We have the right hat for everyone.',
          default_action: {
            type: 'web_url',
            url: 'https://petersfancybrownhats.com/view?item=103',
            webview_height_ratio: 'tall',
          },
          buttons: [
            {
              type: 'web_url',
              url: 'https://petersfancybrownhats.com',
              title: 'View Website',
            }, {
              type: 'postback',
              title: 'Start Chatting',
              payload: 'DEVELOPER_DEFINED_PAYLOAD',
            },
          ],
        },
      ],
    };

    agent.add(new Payload(
      'FACEBOOK',
      facebookJson,
      true,
      true,
    ));
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
