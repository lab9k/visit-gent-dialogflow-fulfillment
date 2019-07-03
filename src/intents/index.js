const intentMap = new Map();
const events = require('./bot.events');

[events].forEach(el => intentMap.set(el.key, el.handler));

module.exports = intentMap;
