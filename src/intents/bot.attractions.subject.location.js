/* eslint-disable no-underscore-dangle */
// const requestPromise = require('request-promise');
const requestPromiseNative = require('request-promise-native');
const i18n = require('i18n');
const { fetchAttractions } = require('../api/SparqlApi');
const AttractionCard = require('../models/AttractionCard');

/**
   * function that calls location api to request the longitude and latitude of a provided address
   * @param {String} address
   * @return JSON result of the api request with locations that match the address
   */
function requestLocation(address, agent) {
  // add Ghent to the address
  const apiLocation = `${address.replace(/ /g, '+')}+Ghent`;
  return requestPromiseNative(`https://eu1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_API_KEY}&q=${apiLocation}&format=json`)
    .catch((e) => {
      console.log(e.message);
      agent.add(i18n.__('Location not found'));
    });
}

/**
   * sends the attractions to Dialogflow that are close to the provided address
   * @param {JSON} location
   * @param {Array} attractions
   * @param agent
   */
function filterAttactionsNeighborhood(location, attractions, agent) {
  const latitude = parseFloat(location.lat);
  const longitude = parseFloat(location.lon);

  // counts the attractions that are in the neighborhood
  let counter = 0;

  // radius of the neighborhood
  const radius = 0.002;

  let i;
  for (i = 0; i < attractions.length && counter < 10; i += 1) {
    const loc = attractions[i].asWKT.value.replace('POINT(', '').replace(')', '').split(' ');

    // checks if the location of the attraction is within the radius
    if ((parseFloat(loc[0]) < (longitude + radius)
              && parseFloat(loc[0]) > (longitude - radius))
              && (parseFloat(loc[1]) < (latitude + radius)
                && parseFloat(loc[1]) > (latitude - radius))) {
      counter += 1;
      agent.add(new AttractionCard(attractions[i]));
    }
  }

  // special message if there are no attractions within the radius
  if (counter === 0) {
    agent.add(i18n.__('No attractions found in the provided neighbourhood'));
  }
}

module.exports = {
  key: 'bot.attractions.subject.location',
  handler(agent) {
    const fetchedLocation = requestLocation(agent.parameters.address, agent);
    const fetchedAttractions = fetchAttractions(agent.context.get('botattractionssubject-followup').parameters.subject);
    const fetched = Promise.all([fetchedLocation, fetchedAttractions]);

    return fetched.then((res) => {
      if (res[0] !== undefined) {
        const location = JSON.parse(res[0])[0];
        const attractions = res[1];

        // checks if requested location is located in Ghent
        if (!location.display_name.includes('Ghent')) {
          agent.add(i18n.__('Location not found in Ghent'));
        } else {
          agent.add(`${i18n.__('Tourist attractions found')}:`);
          filterAttactionsNeighborhood(location, attractions, agent);
        }
      }
    });
  },
};
