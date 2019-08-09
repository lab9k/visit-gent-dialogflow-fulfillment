const { SparqlClient } = require('sparql-client-2');
const { buildEventQuery, buildAttractionQuery } = require('./QueryBuilder');

// Sparql database connection
const client = new SparqlClient('https://stad.gent/sparql').register({
  schema: 'http://schema.org/',
  xsd: 'http://www.w3.org/2001/XMLSchema#',
  foaf: 'http://xmlns.com/foaf/0.1/',
});

/**
   * execute query
   * @param {String} query query to be executed
   * @return result of query
   */
function fetch(query) {
  return client
    .query(query)
    .execute()
    .then(response => response.results.bindings);
}

module.exports = {
  /**
   * fetch attractions for provided subject
   * @param {String} subject subject of attractions
   * @return fetched attractions
   */
  fetchAttractions(subject) {
    // get query from query builder
    const query = buildAttractionQuery(subject);
    return fetch(query);
  },

  /**
   * fetch events for provided date
   * @param {String} date date of events
   * @return fetched events
   */
  fetchEvents(date) {
    // get query from query builder
    const query = buildEventQuery(date);
    return fetch(query);
  },
};
