const { Card } = require('dialogflow-fulfillment');

module.exports = class EventCard extends Card {
  constructor(binding) {
    super(binding.name.value);
    this.setImage(binding.image.value);
    this.setText(`From: ${binding.fromMin.value}
    To: ${binding.toMax.value}`);
    this.setButton({ text: 'Go to website.', url: binding.page.value });
  }
};
