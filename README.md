# visit-gent-dialogflow-fulfillment

## Installation

* clone the repository
```bash
git clone https://github.com/lab9k/visit-gent-dialogflow-fulfillment.git
```

* install dependencies
```bash
npm install
```

* create env file and edit the values as needed
```bash
mv ./env.local ./.env
```

* start the server
```bash
npm start
```

## Supported languages
* English
* Dutch
* French
* German
* Spanish

## Functionality of the chatbot

Examples of interaction between the user and the chatbot:

* Welcome
```
EXAMPLE:
  User: Hello
  Bot: Greetings! How can I assist?
```

* FAQ
```
EXAMPLE
  User: Where can I park my car?
  Bot: Free car parks are available at the edge of the city...
```

* Get events in Ghent
 ```
Example:
  User: Events
  Bot: What day are you looking for events?
  User: Today
  Bot: Top 3 events...
```

* Get events in Ghent for a specific day
 ```
EXAMPLE:
  User: Events today
  Bot: Top 3 events...
```

* Get activities in Ghent
```
EXAMPLE:
  User: What can I do in Ghent?
  Bot: What kind of activity would you like to do? Event or Tourist Attraction
  User: Tourist Attraction
  Bot: What kind of attraction are you looking for?
  User: Monuments
  Bot: Would you like to provide a location?
  User: Yes
  Bot: Provide a location please
  User: Graslei
  Bot: Tourist attractions found:...
```

* Get a specific touristic attractions
```
EXAMPLE:
  User: I’m looking for museums
  Bot: Would you like to provide a location?
  User: Yes
  Bot: Provide a location please
  User: Graslei
  Bot: Tourist attractions found:...
```

## Add new answer
Steps in Dialogflow:
* Add new intent in dialogflow
* Provide an intent name
* Add phrases to call the intent in the Training phrases section
* Add answers to the phrases in the Responses section

## Add new answer with webhook call to fulfillment
Steps in Dialogflow:
* Add new intent in dialogflow
* Provide an intent name
* Add phrases to call the intent in the Training phrases section
* Check the checkbox Enable webhook call for this intent in the Fulfillment section

Steps in the backend:
* Add js file to ./src/intents
* Add handler and path to js file in ./src/intents/index.js

