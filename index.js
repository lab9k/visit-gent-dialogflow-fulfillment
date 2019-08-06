const dialogflow = require('dialogflow');
const express = require('express');
const i18n = require('i18n');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const request = require('request');
const fulfillment = require('./src/fulfillment');
const knowledge = require('./src/knowledge');
const webhook = require('./src/webhook');


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
  locales: ['en', 'nl', 'fr'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'en',
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  const dialog = new DialogFlow('visit-gent-qghbjt');

  dialog.sendTextMessageToDialogFlow('what can I do today?', '1').then((resultMessages) => {
    request.post(`https://graph.facebook.com/v4.0/me/messages?access_token=${process.env.MESSENGER_PAGE_ACCESS_TOKEN}`)
      .form({
        messaging_type: 'RESPONSE',
        recipient: {
          id: '2873207046042391',
        },
        sender_action: 'typing_on',
      });
    let responseJSON;
    let isCard = false;
    let quickReply;
    const result = [];
    const responseJSONCard = {
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

    resultMessages.forEach((e) => {
      if (e.text !== undefined) {
        responseJSON = {
          messaging_type: 'RESPONSE',
          recipient: {
            id: '2873207046042391',
          },
          message: {
            text: e.text.text[0],
            quick_replies: [],
          },
        };
        result.push(responseJSON);
        console.log(result);
      } else if (e.quickReplies !== undefined) {
        e.quickReplies.quickReplies.forEach((reply) => {
          quickReply = {
            content_type: 'text',
            title: reply,
            payload: '<POSTBACK_PAYLOAD>',
          };
          result[result.length - 1].message.quick_replies.push(quickReply);
        });
      } else if (e.card !== undefined) {
        isCard = true;
        responseJSON = {
          title: e.card.title,
          image_url: e.card.imageUri,
          subtitle: e.card.subtitle,
          default_action: {
            type: 'web_url',
            url: e.card.buttons[0].postback,
            webview_height_ratio: 'tall',
          },
          buttons: [
            {
              type: 'web_url',
              url: e.card.buttons[0].postback,
              title: 'View Website',
            },
          ],
        };
        responseJSONCard.message.attachment.payload.elements.push(responseJSON);
      }
    });

    result.forEach((res) => {
      request.post(`https://graph.facebook.com/v4.0/me/messages?access_token=${process.env.MESSENGER_PAGE_ACCESS_TOKEN}`)
        .form(res);
    });

    if (isCard) {
      request.post(`https://graph.facebook.com/v4.0/me/messages?access_token=${process.env.MESSENGER_PAGE_ACCESS_TOKEN}`)
        .form(responseJSONCard);
    }
  });
});

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
}
