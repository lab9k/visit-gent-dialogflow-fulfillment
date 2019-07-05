const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('./api/SparqlApi');
const fulfillment = require('./src/fulfillment');
const AttractionCard = require('./src/models/AttractionCard');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/api', fulfillment);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  fetch('bot.attractions').then(res => console.log(res[0]));
  // const card = new AttractionCard(fetch('bot.attraction')[0]);
  // console.log(card);
});
