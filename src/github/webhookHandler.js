const crypto = require('crypto');
const config = require('../../config/default');

function verifySignature(req) {
  const signature = req.headers['x-hub-signature-256'];
  const body = JSON.stringify(req.body);
  const hmac = crypto.createHmac('sha256', config.github.webhookSecret);
  const calculatedSignature = 'sha256=' + hmac.update(body).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(calculatedSignature));
}

function handlePullRequest(payload) {
  console.log('Received pull request event:', payload.action);
  // Implement your pull request handling logic here
}

function handlePush(payload) {
  console.log('Received push event');
  // Implement your push event handling logic here
}

module.exports = (req, res) => {
  if (!verifySignature(req)) {
    return res.status(401).send('Invalid signature');
  }

  const event = req.headers['x-github-event'];
  
  switch (event) {
    case 'pull_request':
      handlePullRequest(req.body);
      break;
    case 'push':
      handlePush(req.body);
      break;
    // Add more cases for other events you want to handle
    default:
      console.log(`Unhandled event type: ${event}`);
  }

  res.status(200).send('Webhook received');
};