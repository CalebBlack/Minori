const DateDiff = require('date-diff');
const birthday = new Date('Sun, 24 Sep 2017 05:30:00');
module.exports = function(message){
  let dif = new DateDiff(new Date(),birthday);
  console.log(birthday, new Date());
  message.channel.send('I am '+Math.floor(dif.years())+" Years, "+dif.months() % 12+" Months, and "+dif.days() % 365+" days old.");
}
