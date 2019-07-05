const { Card } = require('dialogflow-fulfillment');

module.exports = class AttractionCard extends Card {
  constructor(binding) {
    super(binding.name.value);
    this.setImage(binding.imagesList.value.split(',')[0]);
    this.setText(binding.description.value);
    this.setButton({ text: 'Go to website.', url: binding.page.value });
  }
};
