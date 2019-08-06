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
  locales: ['en', 'nl'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'en',
});

const LANGUAGE_CODE = '';

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
          languageCode: LANGUAGE_CODE,
        },
      },
    };
    try {
      const responses = await this.sessionClient.detectIntent(req);
      console.log('DialogFlow.sendTextMessageToDialogFlow: Detected intent');
      console.log(responses[0].queryResult.fulfillmentText);
      return responses;
    } catch (err) {
      console.error('DialogFlow.sendTextMessageToDialogFlow ERROR:', err);
      throw err;
    }
  }
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // console.log(process.env.DIALOGFLOW_PRIVATE_KEY);
  // console.log(process.env.DIALOGFLOW_CLIENT_EMAIL);
  // detectIntent();
  /* request.get(`https://graph.facebook.com/2873207046042391?fields=first_name,last_name,locale&access_token=${process.env.MESSENGER_PAGE_ACCESS_TOKEN}`,
    (error, response) => {
      console.log(JSON.parse(response.body).locale);
      LANGUAGE_CODE = JSON.parse(response.body).locale;
      const d = new DialogFlow('visit-gent-qghbjt');
      d.sendTextMessageToDialogFlow('Hallo', '1');
    }); */
  // console.log(LANGUAGE_CODE);
  request.post(`https://graph.facebook.com/v4.0/me/messages?access_token=${process.env.MESSENGER_PAGE_ACCESS_TOKEN}`)
    .form(
      {
        messaging_type: 'RESPONSE',
        recipient: {
          id: '2873207046042391',
        },
        message: {
          text: 'hello, world!',
        },
      },
    );
});
