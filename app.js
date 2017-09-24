const Discord = require("discord.js");
const messageListener = require('./messageListener');
const config = require('./config');

const token = config.token;

const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for new guild members
client.on('message',messageListener);

client.login(token);
