const Pokedex = require('pokedex-promise-v2');
const titleCase = require('../functions/titleCase');
const Discord = require('discord.js');
const P = new Pokedex();
module.exports = function(message,args=[]){
  if (args[0]){
    message.channel.send('Looking up '+titleCase(args[0]));
    P.getPokemonByName(encodeURIComponent(args[0])).then((response)=>{
      const types = response.types.map(typeObject=>{return titleCase(typeObject.type.name)});
      var images = Object.entries(response.sprites).filter(entry=>{return entry[1] && !entry[0].includes('back')});
      var image = images[Math.floor(Math.random() * images.length)][1];
      var embed = new Discord.RichEmbed({title:titleCase(response.name),fields:[{name:'ID',value:response.id},{name:(types.length > 1 ? "Types" : "Type"),value:types.join(', ')},{name:"Weight",value:response.weight}]});
      embed.setImage(image);
      message.channel.sendEmbed(embed);
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
