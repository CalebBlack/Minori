const Discord = require("discord.js");
const messageListener = require('./messageListener');
const config = require('./config');

const token = 'MzYxNDU2MTQyNDI3MjI2MTIz.DKkYPg.-0n0xuNsDSXRRecH1eb_tOG3uYg';

const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for new guild members
client.on('message',messageListener);

client.login(token);
