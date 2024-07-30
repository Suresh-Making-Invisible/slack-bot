const { App, ExpressReceiver } = require('@slack/bolt');
const bodyParser = require('body-parser');
require('dotenv').config();

// Created a new ExpressReceiver to attach the Bolt app to Express
const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  endpoints: '/slack/events', // This ensures the endpoint is correctly mapped
});

// Initializes your app with our bot token and ExpressReceiver
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: expressReceiver
});

// Event listener for app mentions
app.event('app_mention', async ({ event, say, ack }) => {
  // Acknowledge the event request
  //await ack();
  console.log('Handling app_mention event:', JSON.stringify(event, null, 2));
  await say(`Hello, <@${event.user}>!`);
});

app.event('hello', async ({ event, say, ack }) => {
  // Acknowledge the event request
  await ack();
  console.log('Handling hello event:', JSON.stringify(event, null, 2));
  await say(`Hello again, <@${event.user}>!`);
});

app.event('hello-world', async ({ event, say, ack }) => {
  // Acknowledge the event request
  await ack();
  console.log('Handling hello event:', JSON.stringify(event, null, 2));
  await say(`Hello again, <@${event.user}>!`);
});
// Starts the Express server
const PORT = process.env.PORT || 3000;
expressReceiver.app.use(bodyParser.json());
console.log('bodyParser.json');
console.log(expressReceiver.app.use(bodyParser.json()));
expressReceiver.app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
