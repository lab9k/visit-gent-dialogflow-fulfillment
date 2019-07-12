/* eslint-disable no-underscore-dangle */
const i18n = require('i18n');
const dateFormat = require('dateformat');
const { QueryType } = require('./queries/index');


function formatDate(date) {
  // Format: yyyy-mm-dd
  // Month + 1 because Javascript starts at 0
  return dateFormat(date, 'yyyy-mm-dd');
}

function addDays(date, days) {
  return date.setDate(date.getDate() + days);
}

module.exports = {
  buildAttractionQuery(category, subject) {
    const query = QueryType.attractions;
    return query
      .replace(/{% lang %}/g, i18n.getLocale())
      .replace(/{% subject %}/g, subject);
  },
  buildEventQuery(time) {
    const startDate = new Date();
    const endDate = new Date();

    switch (time) {
      case 'tomorrow':
        addDays(startDate, 1);
        addDays(endDate, 1);
        break;
      case 'in 2 days':
        addDays(startDate, 2);
        addDays(endDate, 2);
        break;
      default:
        break;
    }
    const query = QueryType.event;
    return query
      .replace(/{% startDate %}/g, formatDate(startDate))
      .replace(/{% endDate %}/g, formatDate(endDate))
      .replace(/{% lang %}/g, i18n.getLocale());
  },
};
