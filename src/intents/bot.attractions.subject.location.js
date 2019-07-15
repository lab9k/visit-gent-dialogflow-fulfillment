/* eslint-disable no-underscore-dangle */
const rp = require('request-promise');
const { fetchAttractions } = require('../../api/SparqlApi');
const AttractionCard = require('../models/AttractionCard');


function requestLocation(location) {
  const apiLocation = `${location.replace(/ /g, '+')}+Gent`;
  return rp(`https://eu1.locationiq.com/v1/search.php?key=0a580bdfff78da&q=${apiLocation}&format=json`)
    .catch(e => console.log(e));
}

module.exports = {
  key: 'bot.attractions.subject.location',
  handler(agent) {
    agent.add('Looking for attractions');
    const fetchedLocation = requestLocation(agent.parameters.address);
    const fetchedAttractions = fetchAttractions(agent.context.get('botattractionssubject-followup').parameters.subject);
    const fetched = Promise.all([fetchedLocation, fetchedAttractions]);

    return fetched.then((res) => {
      const location = JSON.parse(res[0])[0];
      const latitude = parseFloat(location.lat);
      const longitude = parseFloat(location.lon);
      const attractions = res[1];
      let i;
      let counter = 0;
      const radius = 0.001;
      for (i = 0; i < attractions.length; i += 1) {
        const loc = attractions[i].asWKT.value.replace('POINT(', '').replace(')', '').split(' ');
        if ((parseFloat(loc[0]) < (longitude + radius)
      && parseFloat(loc[0]) > (longitude - radius))
      && (parseFloat(loc[1]) < (latitude + radius)
      && parseFloat(loc[1]) > (latitude - radius))) {
          counter += 1;
          agent.add(new AttractionCard(attractions[i]));
        }
      }
      if (counter === 0) {
        agent.add('No attractions found');
      }
    });
  },
};
