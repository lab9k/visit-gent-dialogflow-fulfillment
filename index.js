const dialogflow = require('dialogflow');
const express = require('express');
const i18n = require('i18n');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fulfillment = require('./src/fulfillment');
const knowledge = require('./src/knowledge');


async function detectIntent() {
  // const privateKey = (process.env.NODE_ENV === 'production') ? JSON.parse(process.env.DIALOGFLOW_PRIVATE_KEY) : process.env.DIALOGFLOW_PRIVATE_KEY;
  const privateKey = process.env.DIALOGFLOW_PRIVATE_KEY;
  const clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL;
  const config = {
    credentials: {
      private_key: privateKey,
      client_email: clientEmail,
    },
  };
  const client = new dialogflow.SessionsClient(config);
  const formattedSession = client.sessionPath('visit-gent-qghbjt', '5');
  const queryInput = {
    text: {
      text: 'Bonjour',
      languageCode: 'fr',
    },
  };
  const request = {
    session: formattedSession,
    queryInput,
  };
  client.detectIntent(request)
    .then((responses) => {
      const response = responses[0];
      console.log(response.queryResult.fulfillmentText);
    })
    .catch((err) => {
      console.error(err);
    });
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(i18n.init);
app.post('/api', fulfillment);
app.post('/knowledge', knowledge);
dotenv.config();


i18n.configure({
  locales: ['en', 'nl'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'en',
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  detectIntent();
});
