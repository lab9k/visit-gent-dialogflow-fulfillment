const Koa = require('koa');

const fulfillment = require('./middleware/fulfillment');

const app = new Koa();
app.use(fulfillment);

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`App listening on port ${port}`); });
