/* eslint-disable no-unused-vars */
const { QueryType } = require('./queries/index');

function formatDate(date) {
  // Format: YYYY/MM/DD
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

function addDays(date, days) {
  return date.setDate(date.getDate + days);
}

module.exports = function build(time) {
  const startDate = new Date();
  const endDate = new Date();

  switch (time) {
    case 'tomorrow':
      addDays(startDate, 1);
      addDays(startDate, 1);
      break;
    case 'in 2 days':
      addDays(startDate, 2);
      addDays(startDate, 2);
      break;
  }

  const query = QueryType.event;
  const lang = 'en';
  return query
    .replace(/{% startDate %}/g, formatDate(startDate))
    .replace(/{% endDate %}/g, formatDate(endDate))
    .replace(/{% lang %}/g, lang);
};
