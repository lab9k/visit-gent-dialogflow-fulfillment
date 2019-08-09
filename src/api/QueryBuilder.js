/* eslint-disable no-underscore-dangle */
const i18n = require('i18n');
const dateFormat = require('dateformat');
const { QueryType } = require('./queries/index');

/**
   * format date to proper format
   * @param {String} date date to be formatted
   * @return formatted date
   */
function formatDate(date) {
  // Format: yyyy-mm-dd
  return dateFormat(date, 'yyyy-mm-dd');
}

module.exports = {
  /**
   * build query to collect the attractions for the provided subject and selected language
   * @param {String} subject category of attraction
   * @return query replaced with subject and language
   */
  buildAttractionQuery(subject) {
    const query = QueryType.attractions;
    return query
      .replace(/{% lang %}/g, i18n.getLocale())
      .replace(/{% subject %}/g, subject);
  },

  /**
   * build query to collect the events for the provided date and selected language
   * @param {String} date date of events
   * @return query replaced with date and language
   */
  buildEventQuery(date) {
    let startDate = formatDate(date.startDate);
    let endDate = formatDate(date.endDate);
    // if date is undifined, set startDate and endDate equal to todays date
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
