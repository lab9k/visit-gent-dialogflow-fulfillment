/* eslint-disable no-underscore-dangle */
const i18n = require('i18n');
const rp = require('request-promise');
const { fetchAttractions } = require('../../api/SparqlApi');
const AttractionCard = require('../models/AttractionCard');


function requestLocation(location) {
  const apiLocation = location.replace(/ /g, '+');
  return rp(`https://eu1.locationiq.com/v1/search.php?key=0a580bdfff78da&q=${apiLocation}&format=json`);
}

module.exports = {
  key: 'bot.attractions.subject.location',
  handler(agent) {
    const fetchedLocation = requestLocation(agent.parameters.address);
    const fetchedAttractions = fetchAttractions('eat_drink', agent.context.get('botattractionssubject-followup').subject);
    const fetched = Promise.all([fetchedLocation, fetchedAttractions]);

    return fetched.then((res) => {
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
          agent.add(new AttractionCard(attractions[i]));
        }
      }
    });
  },
};


/*    const fetched = fetchAttractions('eat_drink', agent.parameters.subject);
    return fetched.then((res) => {
      // return top 3 attractions
      if (res.length < 1) {
        agent.add('No attractions found');
      } else {
        let i;
        let card;
        for (i = 0; i < res.length; i += 1) {
          card = new AttractionCard(res[i]);
          agent.add(card);
        }
      }
    }); */
