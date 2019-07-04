// import { QueryBuiler } from './queries';

const { SparqlClient, SPARQL } = require('sparql-client-2');

const client = new SparqlClient('http://dbpedia.org/sparql')
  .register({
    db: 'http://dbpedia.org/resource/',
    dbo: 'http://dbpedia.org/ontology/',
  });

// eslint-disable-next-line no-unused-vars
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
