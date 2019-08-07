/* eslint-disable no-underscore-dangle */
const dialogflow = require('dialogflow');
const request = require('request');
const i18n = require('i18n');


class DialogFlowConnection {
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

  async sendTextMessageToDialogFlow(textMessage, sessionId, languageCode) {
    // Define session path
    const sessionPath = this.sessionClient.sessionPath(this.projectId, sessionId);
    // The text query request.
    const req = {
      session: sessionPath,
      queryInput: {
        text: {
          text: textMessage,
          languageCode,

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
        if (webhookEvent.message !== undefined) {
          const receivedMessage = webhookEvent.message.text;
          const senderId = webhookEvent.sender.id;
          request.get(`https://graph.facebook.com/${senderId}?fields=first_name,last_name,locale&access_token=${process.env.MESSENGER_PAGE_ACCESS_TOKEN}`,
            (error, response) => {
              const languageCode = JSON.parse(response.body).locale;
              const dialogFlowConnection = new DialogFlowConnection('visit-gent-qghbjt');
              dialogFlowConnection
                .sendTextMessageToDialogFlow(receivedMessage, senderId, languageCode)
                .then((sendMessages) => {
                  let quickReply;
                  let isCard = false;
                  let isQuickReply = false;
                  const textResponses = [];
                  let responseJSON = {
                    messaging_type: 'RESPONSE',
                    recipient: {
                      id: senderId,
                    },
                    message: {
                      quick_replies: [],
                      text: '',
                    },
                  }; const responseJSONCard = {
                    messaging_type: 'RESPONSE',
                    recipient: {
                      id: senderId,
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
                      responseJSON.message.text = sendMessage.quickReplies.title;
                      sendMessage.quickReplies.quickReplies.forEach((reply) => {
                        quickReply = {
                          content_type: 'text',
                          title: reply,
                          payload: '<POSTBACK_PAYLOAD>',
                        };
                        responseJSON.message.quick_replies.push(quickReply);
                      });
                      request.post(`https://graph.facebook.com/v4.0/me/messages?access_token=${process.env.MESSENGER_PAGE_ACCESS_TOKEN}`)
                        .form(responseJSON);
                    } else if (sendMessage.message === 'text') {
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
                            title: i18n.__('View Website'),
                          },
                        ],
                      };
                      responseJSONCard.message.attachment.payload.elements.push(responseJSON);
                    }
                  });

                  if (!isQuickReply) {
                    textResponses.forEach((textResponse) => {
                      request.post(`https://graph.facebook.com/v4.0/me/messages?access_token=${process.env.MESSENGER_PAGE_ACCESS_TOKEN}`)
                        .form(textResponse);
                    });
                  }

                  if (isCard) {
                    request.post(`https://graph.facebook.com/v4.0/me/messages?access_token=${process.env.MESSENGER_PAGE_ACCESS_TOKEN}`)
                      .form(responseJSONCard);
                  }
                });
            });
        }
      });
      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  },
};
