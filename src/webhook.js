const LANGUAGE_CODE = 'fr';

const dialogflow = require('dialogflow');

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
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: textMessage,
          languageCode: LANGUAGE_CODE,
        },
      },
    };
    try {
      const responses = await this.sessionClient.detectIntent(request);
      console.log('DialogFlow.sendTextMessageToDialogFlow: Detected intent');
      console.log(responses[0].queryResult.fulfillmentText);
      return responses;
    } catch (err) {
      console.error('DialogFlow.sendTextMessageToDialogFlow ERROR:', err);
      throw err;
    }
  }
}

module.exports = {
  get(req, res) {
    // Your verify token. Should be a random string.
    const VERIFY_TOKEN = process.env.MESSENGER_VERIFY_TOKEN;

    // Parse the query params
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
    }
  },
  post(req, res) {
    const { body } = req;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach((entry) => {
        // Gets the message. entry.messaging is an array, but
        // will only ever contain one message, so we get index 0
        const webhookEvent = entry.messaging[0];
        const message = webhookEvent.message.text;
        console.log(webhookEvent);
        const dialog = new DialogFlow('visit-gent-qghbjt');
        dialog.sendTextMessageToDialogFlow(message, '1');
      });

      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  },
};
