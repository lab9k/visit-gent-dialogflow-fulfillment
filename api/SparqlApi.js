/* eslint-disable no-unused-vars */
// import { QueryBuiler } from './queries';

const { SparqlClient, SPARQL } = require('sparql-client-2');
const build = require('./QueryBuilder');
const QueryType = require('./queries/index');


const client = new SparqlClient('https://stad.gent/sparql')
  .register({
    schema: 'http://schema.org/',
    xsd: 'http://www.w3.org/2001/XMLSchema#',
    foaf: 'http://xmlns.com/foaf/0.1/',
  });

async function query() {
  const queryText = build();
  return client
    .query(queryText)
    .execute()
    // Get the item we want.
    .then(response => response.results.bindings[0].name.value);
}

module.exports = function fetch() {
  return query().then(res => String(res));
};
