const commandMap = require('./commands/map');
const mention = require('./commands/mention');
const unknown = require('./commands/unknown');
module.exports = function(message){
   var arguments = message.cleanContent.toLowerCase().trim().split(' ').filter(function(entry) { return entry != ''; });;
   var command = arguments[1];
   if (arguments[0] === 'minori') {
     if (arguments[1]) {
       if (commandMap[arguments[1]]) {
         commandMap[arguments[1]](message);
       } else {
         unknown(message);
       }
     } else {
       mention(message);
     }
   }
 }
}
