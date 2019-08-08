const express = require('express');
const i18n = require('i18n');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fulfillment = require('./src/fulfillment');
const knowledge = require('./src/knowledge');
const webhook = require('./src/webhookMessenger');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(i18n.init);
app.post('/api', fulfillment);
app.post('/knowledge', knowledge);
app.get('/webhook', webhook.get);
app.post('/webhook', webhook.post);
dotenv.config();

i18n.configure({
  locales: ['en', 'nl', 'fr', 'es', 'de'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'en',
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
