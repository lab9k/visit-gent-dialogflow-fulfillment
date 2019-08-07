// const dialogflow = require('dialogflow');
const express = require('express');
const i18n = require('i18n');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
// const request = require('request');
const fulfillment = require('./src/fulfillment');
const knowledge = require('./src/knowledge');
const webhook = require('./src/webhookMessenger');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(i18n.init);
app.post('/api', fulfillment);
app.post('/knowledge', knowledge);
app.get('/webhook', webhook.get);
app.post('/webhook', webhook.post);
dotenv.config();

i18n.configure({
  locales: ['en', 'nl', 'fr', 'es', 'de'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'en',
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);

  /* const dialog = new DialogFlow('visit-gent-qghbjt');
  dialog.sendTextMessageToDialogFlow('hello', '1')
    .then((sendMessages) => {
      let quickReply;
      let isCard = false;
      let isQuickReply = false;
      const textResponses = [];
      let responseJSON = {
        messaging_type: 'RESPONSE',
        recipient: {
          id: '2873207046042391',
        },
        message: {
          quick_replies: [],
          text: '',
        },
      }; const responseJSONCard = {
        messaging_type: 'RESPONSE',
        recipient: {
          id: '2873207046042391',
        },
        message: {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'generic',
              elements: [
              ],
            },
          },
        },
      };

      sendMessages.forEach((sendMessage) => {
        if (sendMessage.message === 'quickReplies') {
          isQuickReply = true;
          // Quick Reply
          // responseJSON.message.text = sendMessage.quickReplies.title;
          sendMessage.quickReplies.quickReplies.forEach((reply) => {
            quickReply = {
              content_type: 'text',
              title: reply,
              payload: '<POSTBACK_PAYLOAD>',
            };
            responseJSON.message.quick_replies.push(quickReply);
          }); */
  /* request.post(`https://graph.facebook.com/v4.0/me/messages?access_token=${process.env.MESSENGER_PAGE_ACCESS_TOKEN}`)
            .form(responseJSON); */
  /* } else if (sendMessage.message === 'text') {
          // Text
          // eslint-disable-next-line prefer-destructuring
          responseJSON.message.text = sendMessage.text.text[0];
          textResponses.push(responseJSON);
        } else if (sendMessage.message === 'card') {
          // Card

          isCard = true;
          responseJSON = {
            title: sendMessage.card.title,
            image_url: sendMessage.card.imageUri,
            subtitle: sendMessage.card.subtitle,
            default_action: {
              type: 'web_url',
              url: sendMessage.card.buttons[0].postback,
              webview_height_ratio: 'tall',
            },
            buttons: [
              {
                type: 'web_url',
                url: sendMessage.card.buttons[0].postback,
                title: 'View Website',
              },
            ],
          };
          responseJSONCard.message.attachment.payload.elements.push(responseJSON);
        }
      });
      textResponses.forEach((textResponse) => {
        request.post(`https://graph.facebook.com/v4.0/me/messages?access_token=${process.env.MESSENGER_PAGE_ACCESS_TOKEN}`)
          .form(textResponse);
      });

      if (isCard) {
        request.post(`https://graph.facebook.com/v4.0/me/messages?access_token=${process.env.MESSENGER_PAGE_ACCESS_TOKEN}`)
          .form(responseJSONCard);
      }
    }); */
});
/*
class DialogFlow {
  constructor(projectId) {
    this.projectId = projectId;
    const privateKey = (process.env.NODE_ENV === 'production') ? JSON.parse(process.env.DIALOGFLOW_PRIVATE_KEY) : process.env.DIALOGFLOW_PRIVATE_KEY;
    const clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL;
    const config = {
      credentials: {
        private_key: privateKey,
        client_email: clientEmail,
      },
    };

    this.sessionClient = new dialogflow.SessionsClient(config);
  }

  async sendTextMessageToDialogFlow(textMessage, sessionId) {
    // Define session path
    const sessionPath = this.sessionClient.sessionPath(this.projectId, sessionId);
    // The text query request.
    const req = {
      session: sessionPath,
      queryInput: {
        text: {
          text: textMessage,
          languageCode: 'en',
        },
      },
    };
    try {
      const responses = await this.sessionClient.detectIntent(req);
      return responses[0].queryResult.fulfillmentMessages;
    } catch (err) {
      console.error('DialogFlow.sendTextMessageToDialogFlow ERROR:', err);
      throw err;
    }
  }
} */
