const intentMap = new Map();
const events = require('./bot.events');
const attractions = require('./bot.attractions');

/* [events].forEach((el) => {
  intentMap.set(el.key, el.handler);
  console.log(el.key);
  console.log(el.handler);
}); */

intentMap.set('bot.events', events.handler);
intentMap.set('bot.attractions', attractions);

module.exports = intentMap;
