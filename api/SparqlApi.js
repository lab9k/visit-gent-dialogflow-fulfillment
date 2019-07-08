const { SparqlClient } = require('sparql-client-2');
const { buildEventQuery, buildAttractionQuery } = require('./QueryBuilder');

const client = new SparqlClient('https://stad.gent/sparql').register({
  schema: 'http://schema.org/',
  xsd: 'http://www.w3.org/2001/XMLSchema#',
  foaf: 'http://xmlns.com/foaf/0.1/',
});

function fetch(query) {
  return client
    .query(query)
    .execute()
    .then(response => response.results.bindings);
}

module.exports = {
  fetchAttractions(category) {
    const query = buildAttractionQuery(category);
    return fetch(query);
  },
  fetchEvents(time) {
    const query = buildEventQuery(time);
    console.log(query);
    return fetch(query);
  },
};
