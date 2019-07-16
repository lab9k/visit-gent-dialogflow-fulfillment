/* eslint-disable no-underscore-dangle */
const requestPromise = require('request-promise');
const i18n = require('i18n');
const { fetchAttractions } = require('../../api/SparqlApi');
const AttractionCard = require('../models/AttractionCard');


function requestLocation(location, agent) {
  const apiLocation = `${location.replace(/ /g, '+')}+Ghent`;
  return requestPromise(`https://eu1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_API_KEY}&q=${apiLocation}&format=json`)
    .catch((e) => {
      console.log(e.message);
      agent.add(i18n.__('Location not found'));
    });
}

module.exports = {
  key: 'bot.attractions.subject.location',
  handler(agent) {
    agent.add(i18n.__('Looking for attractions'));
    const fetchedLocation = requestLocation(agent.parameters.address, agent);
    const fetchedAttractions = fetchAttractions(agent.context.get('botattractionssubject-followup').parameters.subject);
    const fetched = Promise.all([fetchedLocation, fetchedAttractions]);

    return fetched.then((res) => {
      if (res[0] !== undefined) {
        const location = JSON.parse(res[0])[0];
        if (!location.display_name.includes('Ghent')) {
          agent.add(i18n.__('Location not found in Ghent'));
        } else {
          const latitude = parseFloat(location.lat);
          const longitude = parseFloat(location.lon);
          const attractions = res[1];
          let i;
          let counter = 0;
          const radius = 0.002;
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
            agent.add(i18n.__('No attractions found in the provided neighbourhood'));
          }
        }
      }
    });
  },
};
