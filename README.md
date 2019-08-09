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

* Welcome
```
  e.g. Hello
```

* FAQ
```
  e.g. Where can I park my car?
```

* Get events in Ghent
 ```
	e.g. Events
```

* Get events in Ghent for a specific day
 ```
	e.g. Events today
```

* Get activities in Ghent
```
  e.g. What can I do in Ghent?
```

* Get a specific touristic attractions
```
  e.g. I’m looking for museums
```

## Add new answer
Steps:
* Add new intent in dialogflow
* Provide an intent name
* Add phrases to call the intent in the Training phrases section
* Add answers to the phrases in the Responses section

## Add new answer with webhook call to fulfillment
Steps:


