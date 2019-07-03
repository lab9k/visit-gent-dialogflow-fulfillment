const express = require('express');

const fulfillment = require('./middleware/fulfillment');

const app = express();
app.get('/api', fulfillment);

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`App listening on port ${port}`); });
