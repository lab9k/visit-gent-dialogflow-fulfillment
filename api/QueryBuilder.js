/* eslint-disable no-unused-vars */
const { QueryType } = require('./queries/index');

function formatDate(date) {
  // Format: YYYY/MM/DD
  // Month + 1 because Javascript starts at 0
  // TODO: delete comment multiple events
  // return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  return `${date.getFullYear()}`;
}

// eslint-disable-next-line no-extend-native
Date.prototype.addDays = function (days) {
  return this.setDate(this.getDate() + days);
};

module.exports = function build(time) {
  const startDate = new Date();
  const endDate = new Date();

  switch (time) {
    case 'tomorrow':
      startDate.addDays(1);
      endDate.addDays(1);
      break;
    case 'in 2 days':
      startDate.addDays(2);
      endDate.addDays(2);
      break;
    default:
      break;
  }
  const query = QueryType.event;
  const lang = 'en';
  return query
    .replace(/{% startDate %}/g, formatDate(startDate))
    .replace(/{% endDate %}/g, formatDate(endDate))
    .replace(/{% lang %}/g, lang);
};
