const intentMap = new Map();
const events = require('./bot.events');
// const attractions = require('./bot.attractions');

[events].forEach((el) => {
  intentMap.set(el.key, el.handler);
  console.log(el.key);
});

module.exports = intentMap;
