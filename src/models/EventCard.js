/* eslint-disable no-underscore-dangle */
const { Card } = require('dialogflow-fulfillment');
const i18n = require('i18n');

module.exports = class EventCard extends Card {
  constructor(binding) {
    super(binding.name.value);
    this.setImage(binding.image.value);
    this.setText(`${i18n.__('From')}: ${binding.fromMin.value}
    ${i18n.__('To')}: ${binding.toMax.value}`);
    this.setButton({ text: `${i18n.__('Go to website')}.`, url: binding.page.value });
  }
};
