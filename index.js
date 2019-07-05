const express = require('express');
const i18n = require('i18n');
const bodyParser = require('body-parser');
const fulfillment = require('./src/fulfillment');

const fetch = require('./api/SparqlApi');
const EventCard = require('./src/models/EventCard');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(i18n.init);
app.post('/api', fulfillment);

i18n.configure({
  locales: ['en', 'nl'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'en',
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  fetch('bot.events', 'today').then((res) => {
    const card = new EventCard(res[0]);
    console.log(card);
  });
});
