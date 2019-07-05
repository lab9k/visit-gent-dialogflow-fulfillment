const { Suggestion } = require('dialogflow-fulfillment');


module.exports = class AttractionSuggestion extends Suggestion {
  constructor() {
    super('suggestion');
    this.setReply('Nightlife');
    this.setPlatform(1);
  }
};
