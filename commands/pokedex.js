const Pokedex = require('pokedex-promise-v2');
const titleCase = require('../functions/titleCase');
const Discord = require('discord.js');
const P = new Pokedex();
module.exports = function(message,args=[]){
  if (args[0]){
    message.channel.send('Looking up '+args[0]);
    P.getPokemonByName(args[0]).then((response)=>{
      var output = ' - '+titleCase(response.name)+' -';
      output += '\nID: '+response.id;
      const types = response.types.map(typeObject=>{return titleCase(typeObject.type.name)});
      output += '\nTypes: '+types.join(', ');
      output += '\nWeight: '+(response.weight || 'unknown');
      var images = Object.values(response.sprites).filter(image=>{return image});
      var image = images[Math.floor(Math.random() * images.length)];
      var embed = new Discord.RichEmbed({title:titleCase(response.name),fields:[{name:'ID',value:response.id}]});
      embed.setImage(image);
      message.channel.sendEmbed(embed);
      //console.log(response);
    }).catch(error=>{
      if (error.statusCode && error.statusCode == 404) {
        message.channel.send('That Pokemon is not even real asshole.');
      } else {
        message.channel.send('Pokedex Error! Please change the batteries.');
      }
    });
  } else {
    message.channel.send("You have to tell me who to look up!!!");
  }
}
