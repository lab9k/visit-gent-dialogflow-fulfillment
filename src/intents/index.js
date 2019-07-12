const intentMap = new Map();
const events = require('./bot.events');
const attractions = require('./bot.attractions');
const attractionsCategory = require('./bot.attractions.category');
const activities = require('./bot.activities');

intentMap.set('bot.events', events.handler);
intentMap.set('bot.attractions', attractions.handler);
intentMap.set('bot.attractions.category', attractionsCategory.handler);
intentMap.set('bot.activities', activities.handler);

module.exports = intentMap;
