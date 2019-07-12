const express = require('express');
const i18n = require('i18n');
const bodyParser = require('body-parser');
const googleMaps = require('@google/maps');
const fulfillment = require('./src/fulfillment');

const { fetchEvents, fetchAttractions } = require('./api/SparqlApi');

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

  fetchAttractions('see_do', 'Monuments').then((res) => {
    console.log(res);
  });

  // fetch events for fiven location
  /* fetchEvents('in 2 days').then((res) => {
    let i;
    const radius = 0.00000001;
    const lat = 3.720138;
    const long = 51.055816;
    for (i = 0; i < res.length; i += 1) {
      const loc = res[i].asWKT.value.replace('POINT(', '').replace(')', '').split(' ');
      if ((loc[0] < (lat + radius) && loc[0] > (lat - radius))
      && (loc[1] < (long + radius) && loc[1] > (long - radius))) {
        // console.log(res[i]);
        // console.log(i);
      }
    }
  }); */

  // get location
  /* const googleMapsClient = googleMaps.createClient({
    key: '',
  });

  googleMapsClient.geocode({
    address: '1600 Amphitheatre Parkway, Mountain View, CA',
  }, (err, response) => {
    if (!err) {
      console.log(response.json.results);
    }
  }); */
});
