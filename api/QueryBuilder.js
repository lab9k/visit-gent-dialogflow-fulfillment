/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const i18n = require('i18n');
const dateFormat = require('dateformat');
const { QueryType } = require('./queries/index');


function formatDate(date) {
  // Format: YYYY-MM-DD
  // Month + 1 because Javascript starts at 0
  return dateFormat(date, 'yyyy-mm-dd');
}

/* Date.prototype.addDays = function (days) {
  return this.setDate(this.getDate() + days);
}; */

function addDays(date, days) {
  return date.setDate(date.getDate() + days);
}

module.exports = {
  buildAttractionQuery(category) {
    const query = QueryType.attractions;
    return query
      .replace(/{% lang %}/g, i18n.getLocale())
      .replace(/{% type %}/g, category);
  },
  buildEventQuery(time) {
    const startDate = new Date();
    const endDate = new Date();

    switch (time) {
      case i18n.__('tomorrow'):
        addDays(startDate, 1);
        addDays(endDate, 1);
        break;
      case i18n.__('in 2 days'):
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
