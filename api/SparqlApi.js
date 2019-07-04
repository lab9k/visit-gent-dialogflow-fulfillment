/* eslint-disable no-unused-vars */
// import { QueryBuiler } from './queries';

const SparqlClient = require('sparql-client-2');

const { SPARQL } = SparqlClient.SPARQL;

const client = new SparqlClient('http://dbpedia.org/sparql')
  .register({
    db: 'http://dbpedia.org/resource/',
    dbo: 'http://dbpedia.org/ontology/',
  });

function fetchCityLeader(cityName) {
  return client
    .query(SPARQL`PREFIX db: <http://dbpedia.org/resource/>
    PREFIX dbpedia: <http://dbpedia.org/property/>
    SELECT ?leaderName
    FROM <http://dbpedia.org>
    WHERE {
      ${{ db: cityName }} dbpedia:leaderName ?leaderName
    }
    LIMIT 10`)
    .execute()
  // Get the item we want.
    .then(response => Promise.resolve(response.results.bindings[0].leaderName.value));
}

function fetch() {
  return String(fetchCityLeader('Vienna'));
}
