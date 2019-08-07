const intentMap = new Map();
const events = require('./bot.events');
const activities = require('./bot.activities');
const attractionsSubject = require('./bot.attractions.subject');
const attractionsSubjectNoLocation = require('./bot.attractions.subject.noLocation');
const attractionsSubjectLocation = require('./bot.attractions.subject.location');
const attractions = require('./bot.attractions');

intentMap.set('bot.attractions', attractions.handler);
intentMap.set('bot.events', events.handler);
intentMap.set('bot.events.direct', events.handler);
intentMap.set('bot.activities', activities.handler);
intentMap.set('bot.attractions.subject', attractionsSubject.handler);
intentMap.set('bot.attractions.subject - no', attractionsSubjectNoLocation.handler);
intentMap.set('bot.attractions.subject.location', attractionsSubjectLocation.handler);

module.exports = intentMap;
