/* eslint-disable no-underscore-dangle */
const i18n = require('i18n');
const dateFormat = require('dateformat');
const { QueryType } = require('./queries/index');


function formatDate(date) {
  // Format: yyyy-mm-dd
  // Month + 1 because Javascript starts at 0
  return dateFormat(date, 'yyyy-mm-dd');
}

// function addDays(date, days) {
//   return date.setDate(date.getDate() + days);
// }

module.exports = {
  buildAttractionQuery(subject) {
    const query = QueryType.attractions;
    return query
      .replace(/{% lang %}/g, i18n.getLocale())
      .replace(/{% subject %}/g, subject);
  },
  buildEventQuery(time) {
    let startDate = formatDate(time.startDate);
    let endDate = formatDate(time.endDate);
    if (startDate === undefined || endDate === undefined) {
      startDate = new Date();
      endDate = new Date();
    }

    const query = QueryType.event;
    return query
      .replace(/{% startDate %}/g, formatDate(startDate))
      .replace(/{% endDate %}/g, formatDate(endDate))
      .replace(/{% lang %}/g, i18n.getLocale());
  },
};
