const intentMap = new Map();
const events = require('./bot.events');
const attractions = require('./bot.attractions');

intentMap.set('bot.events', events.handler);
intentMap.set('bot.attractions', attractions.handler);

module.exports = intentMap;
