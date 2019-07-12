const express = require('express');
const i18n = require('i18n');
const bodyParser = require('body-parser');
const request = require('request');
const rp = require('request-promise');
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

function requestLocation(location) {
  const apiLocation = location.replace(/ /g, '+');
  request(`https://eu1.locationiq.com/v1/search.php?key=0a580bdfff78da&q=${apiLocation}&format=json`,
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        return JSON.parse(body);
      }
      return null;
    });

  return rp(`https://eu1.locationiq.com/v1/search.php?key=0a580bdfff78da&q=${apiLocation}&format=json`);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);

  const fetchedLocation = requestLocation('oude houtlei 117 gent');
  const fetchedAttractions = fetchAttractions('eat_drink', 'Cafés');
  Promise.all([fetchedLocation, fetchedAttractions]).then((res) => {
    const location = JSON.parse(res[0])[0];
    const latitude = parseFloat(location.lat);
    const longitude = parseFloat(location.lon);
    const attractions = res[1];
    let i;
    const radius = 0.001;
    console.log(`longitude: ${longitude + radius}:${longitude - radius}`);
    console.log(`latitude: ${latitude + radius}:${latitude - radius}`);
    for (i = 0; i < attractions.length; i += 1) {
      const loc = attractions[i].asWKT.value.replace('POINT(', '').replace(')', '').split(' ');
      console.log(`${parseFloat(loc[0])} ${parseFloat(loc[1])}`);
      if ((parseFloat(loc[0]) < (longitude + radius)
      && parseFloat(loc[0]) > (longitude - radius))
      && (parseFloat(loc[1]) < (latitude + radius)
      && parseFloat(loc[1]) > (latitude - radius))) {
        console.log(attractions[i].name);
      }
    }
  });
  /* fetchAttractions('eat_drink', 'Cafés').then((res) => {
    rp('https://eu1.locationiq.com/v1/search.php?key=0a580bdfff78da&q=oude+houtlei+117+gent&format=json')
      .then((resLocation) => {
        const location = JSON.parse(resLocation);
        const { lat } = location[0];
        const { lon } = location[0];
        console.log(res[0]);

        let i;
        const radius = 0.0001;
        for (i = 0; i < res.length; i += 1) {
          const loc = res[i].asWKT.value.replace('POINT(', '').replace(')', '').split(' ');
          if ((loc[0] < (lat + radius) && loc[0] > (lat - radius))
                            && (loc[1] < (lon + radius) && loc[1] > (lon - radius))) {
            console.log(res[i]);
          }
        }
      }).catch();
  }).catch();
  /* try {
    rp('https://eu1.locationiq.com/v1/search.php?key=0a580bdfff78da&q=oude+houtlei+117+gent&format=json')
      .then((response) => {
        console.log(response);
        fetchAttractions('eat_drink', 'Cafés').then((res) => {
          const location = response;
          const lati = location[0].lat;
          const long = location[0].lon;
          let i;
          const radius = 0.0001;
          for (i = 0; i < res.length; i += 1) {
            const loc = res[i].asWKT.value.replace('POINT(', '').replace(')', '').split(' ');
            if ((loc[0] < (lati + radius) && loc[0] > (lati - radius))
                      && (loc[1] < (long + radius) && loc[1] > (long - radius))) {
              console.log(res[i]);
            }
          }
        });
      });
  } catch (e) {
    console.log(e);
  } */
});


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
