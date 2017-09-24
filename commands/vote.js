const upAliases = ['up','plus','+','↑','stay','😊','😄','👌','😍','❤️','👍'];
const downAliases = ['down','minus','-','↓','leave','☹️','😞','😦','💔','👎'];

var votes = {};
var judgeListeners = [];

function vote(message,args=[]){
  if (!votes[message.channel.id]) {
    votes[message.channel.id] = {};
  }
  if (args[0]) {
    if (upAliases.includes(args[0])) {
      votes[message.channel.id][message.author.id] = 1;
      judge(message.channel);
      message.channel.send('You have voted to keep me in this channel.');
      setTimeout(()=>{
        let retort = message.channel.send("At least someone likes me...")
        retort.then(message=>{
          setTimeout(()=>{message.delete()},300);
        });
      },1000);
    } else if (downAliases.includes(args[0])) {
      votes[message.channel.id][message.author.id] = -1;
      judge(message.channel);
      message.channel.send("You have voted to remove me from this channel.");
      setTimeout(()=>{
        let retort = message.channel.send("I guess that's just how it is...")
        retort.then(message=>{
          setTimeout(()=>{message.delete()},300);
        });
      },1000);
    } else {
      message.channel.send('Invalid Direction!');
    }
  } else {
    message.channel.send('You must vote up or down!');
  }
}
function judge(channel) {
  let total = Object.values(votes[channel.id]).reduce(function (a, b) {return a + b}, 0);
  channel.send('Current Tally: '+total);
  judgeListeners.forEach(callback=>{
    callback(channel,total);
  });
}
function onJudge(callback){
  judgeListeners.push(callback);
}
module.exports = {vote,onJudge};
