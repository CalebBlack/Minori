const commandMap = require('./commands/map');
const mention = require('./commands/mention');
const unknown = require('./commands/unknown');
module.exports = function(message){
   var arguments = message.cleanContent.trim().split(' ').filter(function(entry) { return entry != ''; });;
   var command = arguments[1];
   if (arguments[0].toLowerCase() === 'minori') {
     if (arguments[1]) {
       if (commandMap[arguments[1]]) {
         if (arguments.length > 2) {
           commandMap[arguments[1]](message,arguments.slice(2));
         } else {
           commandMap[arguments[1]](message);
         }
       } else {
         unknown(message);
       }
     } else {
       mention(message);
     }
  }
}
