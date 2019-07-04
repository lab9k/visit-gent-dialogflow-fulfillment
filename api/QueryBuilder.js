/* eslint-disable no-unused-vars */
const { QueryType } = require('./queries/index');

function formatDate(date) {
  // Format: YYYY/MM/DD
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
}

module.exports = function build() {
  const query = QueryType.event;
  const startDate = new Date();
  const endDate = new Date();
  const lang = 'en';
  return query
    .replace(/{% startDate %}/g, formatDate(startDate))
    .replace(/{% endDate %}/g, formatDate(endDate))
    .replace(/{% lang %}/g, lang);
};
