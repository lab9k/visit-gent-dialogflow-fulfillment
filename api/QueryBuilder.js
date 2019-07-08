/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const i18n = require('i18n');
const { QueryType } = require('./queries/index');

function formatDate(date) {
  // Format: YYYY/MM/DD
  // Month + 1 because Javascript starts at 0

  // TO DO: delete comment
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  // return `${date.getFullYear()}`;
}

Date.prototype.addDays = function (days) {
  return this.setDate(this.getDate() + days);
};

module.exports = function buildAttractionQuery(category) {
  const query = QueryType.attractions;
  return query
    .replace(/{% lang %}/g, i18n.getLocale())
    .replace(/{% type %}/g, category);
};

module.exports = function buildEventQuery(time) {
  const startDate = new Date();
  const endDate = new Date();

  switch (time) {
    case i18n.__('tomorrow'):
      startDate.addDays(1);
      endDate.addDays(1);
      break;
    case i18n.__('in 2 days'):
      startDate.addDays(2);
      endDate.addDays(2);
      break;
    default:
      break;
  }
  const query = QueryType.event;
  return query
    .replace(/{% startDate %}/g, formatDate(startDate))
    .replace(/{% endDate %}/g, formatDate(endDate))
    .replace(/{% lang %}/g, i18n.getLocale());
};
