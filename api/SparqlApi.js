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

function query() {
  const queryText = build();
  return client
    .query(queryText)
    .execute()
    .then(response => response.results.bindings[0]);
}


module.exports = function fetch() {
  const resultQuery = query();
  const result = `"messages": [{"platform"="facebook","speeck": "${resultQuery.name}","type": 0}]`;

  /* "messages": [
  {
    "buttons": [
      {
        "postback": "Card Link URL or text",
        "text": "Card Link Title"
      }
    ],
    "imageUrl": "http://urltoimage.com",
    "platform": "facebook",
    "subtitle": "Card Subtitle",
    "title": "Card Title",
    "type": 1
  }
]
 */

  return JSON.parse(result);
};
