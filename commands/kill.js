module.exports = function(message,args=[]){
  if (args[0]) {
    message.channel.send('Eliminating '+args[0]);
  } else {
    console.log(args);
    message.channel.send('Please include a target to terminate.');
  }
}
