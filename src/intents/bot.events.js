const fetch = require('../../api/SparqlApi');


module.exports = {
  key: 'bot.events',
  handler(agent) {
<<<<<<< HEAD
    // agent.add('Received your request for events successfully!');
    fetch().then(res => agent.add(res));
=======
    agent.add('Received your request for events successfully!');
    fetch();
    const fetched = fetch();
    fetched.then((res) => {
      console.log('bot.events: result', res);
      agent.add(res);
    });
>>>>>>> origin/master
    // agent.add(`Events: ${fetch()}`);
  },
};
