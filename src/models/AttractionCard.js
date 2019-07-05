/* eslint-disable no-underscore-dangle */
const { Card } = require('dialogflow-fulfillment');
const i18n = require('i18n');

module.exports = class AttractionCard extends Card {
  constructor(binding) {
    super(binding.name.value);
    this.setImage(binding.imagesList.value.split(',')[0]);
    this.setText(binding.description.value);
    this.setButton({ text: `${i18n.__('Go to website')}.`, url: binding.page.value });
  }
};
