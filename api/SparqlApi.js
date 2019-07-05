const { SparqlClient } = require('sparql-client-2');
const build = require('./QueryBuilder');

const client = new SparqlClient('https://stad.gent/sparql').register({
  schema: 'http://schema.org/',
  xsd: 'http://www.w3.org/2001/XMLSchema#',
  foaf: 'http://xmlns.com/foaf/0.1/',
});

function query(type, time) {
  const queryText = build(type, time);
  return client
    .query(queryText)
    .execute()
    .then(response => response.results.bindings);
}


module.exports = function fetch(time) {
  return query(time);
};
