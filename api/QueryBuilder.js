/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const i18n = require('i18n');
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

function getAttractions() {
  const query = QueryType.attractions;
  return query
    .replace(/{% lang %}/g, i18n.getLocale());
}

function getEvents(time) {
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
}

module.exports = function build(type, time) {
  let res;
  switch (type) {
    case 'bot.events':
      res = getEvents(time);
      break;
    case 'bot.attractions':
      res = getAttractions();
      break;
    default:
      res = '';
      break;
  }
  return res;
};
