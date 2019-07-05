const { SparqlClient } = require('sparql-client-2');
const build = require('./QueryBuilder');

const client = new SparqlClient('https://stad.gent/sparql').register({
  schema: 'http://schema.org/',
  n3: 'http://schema.org/',
});

function query(type, time) {
  const queryText = build(type, time);
  return client
    .query(queryText)
    .execute()
    .then(response => response.results.bindings);
}


module.exports = function fetch(type, time) {
  return query(type, time);
};
