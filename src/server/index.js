const express = require('express');
const bodyParser = require('body-parser');
const webhookHandler = require('../github/webhookHandler');
const config = require('../../config/default');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', webhookHandler);

const port = process.env.PORT || config.server.port;
app.listen(port, () => console.log(`Webhook server listening on port ${port}`));