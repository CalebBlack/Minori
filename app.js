const Discord = require("discord.js");
const token = 'MzYxNDU2MTQyNDI3MjI2MTIz.DKkYPg.-0n0xuNsDSXRRecH1eb_tOG3uYg';
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

client.login(token);
