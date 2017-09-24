const commandMap = require('./commands/map');
const mention = require('./commands/mention');
const unknown = require('./commands/unknown');
const vote = require('./commands/vote');
const commands = Object.assign({},commandMap,{vote:vote.vote});
var disabledChannels = {};

vote.onJudge((channel,tally)=>{
  let before = disabledChannels[channel.id];
  let current = disabledChannels[channel.id] = tally < 0;
  if (before === false && current === true) {
    channel.send('Leaving the channel');
  }
  if (before === true && current === false) {
    channel.send('I am back I guess');
  }
});

module.exports = function(message){
   var arguments = message.cleanContent.trim().split(' ').filter(function(entry) { return entry != ''; });;
   var command = arguments[1];
   if (arguments[0] && arguments[0].toLowerCase() === 'minori') {
     if (disabledChannels[message.channel.id] === true) {
       if (command === 'vote') {
         if (arguments.length > 2) {
           vote.vote(message,arguments.slice(2));
         } else {
           vote.vote(message);
         }
       }
       return;
     }
     if (arguments[1]) {
       if (commands[arguments[1].toLowerCase()]) {
         if (arguments.length > 2) {
           commands[arguments[1].toLowerCase()](message,arguments.slice(2));
         } else {
           commands[arguments[1]](message);
         }
       } else {
         unknown(message);
       }
     } else {
       mention(message);
     }
  }
}
