const express = require('express');
const bodyParser = require('body-parser');
const { Suggestion, PLATFORMS } = require('dialogflow-fulfillment');
const fulfillment = require('./src/fulfillment');

const fetch = require('./api/SparqlApi');
const AttractionCard = require('./src/models/AttractionCard');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/api', fulfillment);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  fetch('bot.attractions').then((res) => {
    const card = new AttractionCard(res[0]);
    console.log(new Suggestion('yess').setPlatform(PLATFORMS.FACEBOOK));
  });
});
