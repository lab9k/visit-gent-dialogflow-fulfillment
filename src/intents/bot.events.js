const fetch = require('../../api/SparqlApi');


module.exports = {
  key: 'bot.events',
  handler(agent) {
    agent.add('Received your request for events successfully!');
    fetch();
    const fetched = fetch();
    return fetched.then((res) => {
      console.log('bot.events: result', res);
      agent.add(res);
    });
    // agent.add(`Events: ${fetch()}`);
  },
};
