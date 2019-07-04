const express = require('express');
const bodyParser = require('body-parser');

const fulfillment = require('./src/fulfillment');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/api', fulfillment);

// const fetch = require('./api/SparqlApi');


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  // fetch('tomorrow').then(res => console.log(res));
});
