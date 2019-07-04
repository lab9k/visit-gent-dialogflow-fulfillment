/* eslint-disable no-unused-vars */
// import { QueryBuiler } from './queries';

const { SparqlClient, SPARQL } = require('sparql-client-2');

const client = new SparqlClient('http://dbpedia.org/sparql')
  .register({
    db: 'http://dbpedia.org/resource/',
    dbo: 'http://dbpedia.org/ontology/',
  });

function fetchCityLeader(cityName) {
  return client
    .query(SPARQL`
    SELECT ?leaderName
    WHERE {
      ${{ db: cityName }} dbo:leaderName ?leaderName
    }`)
    .execute()
  // Get the item we want.
    .then(response => Promise.resolve(response.results.bindings[0].leaderName.value));
}

module.exports = function fetch() {
  return String(fetchCityLeader('Vienna'));
};
