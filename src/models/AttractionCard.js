const { Card } = require('dialogflow-fulfillment');

module.exports = class EventCard extends Card {
  constructor(binding) {
    super(binding.name.value);
    this.setImage(binding.imagesList[0].value);
    this.setText(binding.description.value);
    this.setButton({ text: 'Go to website.', url: binding.page.value });
  }
};

/*
* @example
* let card = new Card('card title');
* card.setImage('https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png');
* card.setText('This is the body text of a card.  You can even use line\nbreaks and emoji! 💁');
* card.setButton({text: 'This is a button', url: 'https://assistant.google.com/'});
* const anotherCard = new Card({
*     title: 'card title',
*     text: 'card text',
*     imageUrl: https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png,
*     buttonText: This is a button',
*     buttonUrl: 'https://assistant.google.com/',
*     platform: 'ACTIONS_ON_GOOGLE'
* });
*/
