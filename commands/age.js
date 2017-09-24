const DateDiff = require('date-diff');
const birthday = new Date('2017-09-24T10:10:08Z');
module.exports = function(message){
  var nowUTC = new Date(new Date().getTime());
  let dif = new DateDiff(nowUTC,birthday);
  message.channel.send('I am '+Math.floor(dif.years())+" Years, "+dif.months() % 12+" Months, and "+dif.days() % 365+" days old.");
}
