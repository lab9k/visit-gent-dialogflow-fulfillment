const express = require('express');
const i18n = require('i18n');
const bodyParser = require('body-parser');
const fulfillment = require('./src/fulfillment');

const fetch = require('./api/SparqlApi');
const AttractionCard = require('./src/models/AttractionCard');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(i18n.init);
app.post('/api', fulfillment);

i18n.configure({
  locales: ['en', 'nl'],
  directory: `${__dirname}/locales`,
});

i18n.setLocale('nl');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  const greeting = i18n.__('Hello');
  console.log(greeting);
  fetch('bot.attractions').then((res) => {
    const card = new AttractionCard(res[0]);
  });
});
