const express = require('express');
const i18n = require('i18n');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const fulfillment = require('./src/fulfillment');

const { fetchAttractions, fetchEvents } = require('./api/SparqlApi');


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

function requestLocation(location) {
  const apiLocation = location.replace(/ /g, '+');
  return rp(`https://eu1.locationiq.com/v1/search.php?key=0a580bdfff78da&q=${apiLocation}&format=json`);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);

  fetchEvents('Today').then(res => console.log(res));

  const fetchedLocation = requestLocation('oude houtlei 117 gent');
  const fetchedAttractions = fetchAttractions('Cafés');
  Promise.all([fetchedLocation, fetchedAttractions]).then((res) => {
    const location = JSON.parse(res[0])[0];
    const latitude = parseFloat(location.lat);
    const longitude = parseFloat(location.lon);
    const attractions = res[1];
    let i;
    const radius = 0.001;
    for (i = 0; i < attractions.length; i += 1) {
      const loc = attractions[i].asWKT.value.replace('POINT(', '').replace(')', '').split(' ');
      if ((parseFloat(loc[0]) < (longitude + radius)
      && parseFloat(loc[0]) > (longitude - radius))
      && (parseFloat(loc[1]) < (latitude + radius)
      && parseFloat(loc[1]) > (latitude - radius))) {
        // console.log(attractions[i].name);
      }
    }
  });
});
