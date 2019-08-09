/* eslint-disable no-underscore-dangle */
const dialogflow = require('dialogflow');
const request = require('request');
const i18n = require('i18n');

class DialogFlowConnection {
  /**
   * connect to Dialogflow and initiate the sessionclient
   * @param {String} projectId id of the Dialogflow project
   * @class
   */
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

  /**
   * connect to Dialogflow and initiate the sessionclient
   * @param {String} textMessage message send to Dialogflow
   * @param {String} sessionId id of session
   * @param {String} languageCode language of the message
   * @return response to the sended message
   */
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
  /**
   * GET api
   * webhook verification
   */
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
  /**
   * POST api
   * webhook endpoint
   */
  post(req, res) {
    const { body } = req;
    // Checks this is an event from a page subscription
    if (body.object === 'page') {
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach((entry) => {
        // Gets the message. entry.messaging is an array, but
        // will only ever contain one message, so we get index 0
        const webhookEvent = entry.messaging[0];
        // only answer if the message is not null
        if (webhookEvent.message !== undefined) {
          const receivedMessage = webhookEvent.message.text;
          const senderId = webhookEvent.sender.id;
          // get language of sender
          request.get(`https://graph.facebook.com/${senderId}?fields=locale&access_token=${process.env.MESSENGER_PAGE_ACCESS_TOKEN}`,
            (error, response) => {
              const languageCode = JSON.parse(response.body).locale;

              // post mark seen
              request.post(`https://graph.facebook.com/v4.0/me/messages?access_token=${process.env.MESSENGER_PAGE_ACCESS_TOKEN}`)
                .form({
                  recipient: {
                    id: senderId,
                  },
                  sender_action: 'mark_seen',
                });

              // post typing
              request.post(`https://graph.facebook.com/v4.0/me/messages?access_token=${process.env.MESSENGER_PAGE_ACCESS_TOKEN}`)
                .form({
                  recipient: {
                    id: senderId,
                  },
                  sender_action: 'typing_on',
                });

              // create connection to Dialogflow project
              const dialogFlowConnection = new DialogFlowConnection('visit-gent-qghbjt');
              dialogFlowConnection
                .sendTextMessageToDialogFlow(receivedMessage, senderId, languageCode)
                .then((sendMessages) => {
                  let quickReply;
                  let isCard = false;

                  // array for multiple text messages
                  const responses = [];

                  // JSON text and quick replies
                  let responseJSON = {
                    messaging_type: 'RESPONSE',
                    recipient: {
                      id: senderId,
                    },
                    message: {
                      quick_replies: [],
                      text: '',
                    },
                  };

                  // JSON card response
                  const responseJSONCard = {
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

                  // iterate over messages
                  sendMessages.forEach((sendMessage) => {
                    if (sendMessage.message === 'quickReplies') {
                      // Quick Reply
                      // For each object in the array quickReplies push a quickreply to the response JSON
                      sendMessage.quickReplies.quickReplies.forEach((reply) => {
                        quickReply = {
                          content_type: 'text',
                          title: reply,
                          payload: '<POSTBACK_PAYLOAD>',
                        };
                        responseJSON.message.quick_replies.push(quickReply);
                      });
                    } else if (sendMessage.message === 'text') {
                      // Text
                      const text = sendMessage.text.text[0];
                      responseJSON.message.text = text;
                      responses.push(responseJSON);
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

                  // post text and quickReplies to messenger
                  // iterates over the different messages and post them to messenger
                  responses.forEach((textResponse) => {
                    request.post(`https://graph.facebook.com/v4.0/me/messages?access_token=${process.env.MESSENGER_PAGE_ACCESS_TOKEN}`)
                      .form(textResponse);
                  });

                  // post cards to messenger
                  // checks if there are any cards
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
