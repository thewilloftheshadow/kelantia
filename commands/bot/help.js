const re = require(`../../resources.js`).data

module.exports.run = async (client, message, args) => {
  let command = args[0];
  let commands = [];
  if (!command){
    let embed = new re.Discord.MessageEmbed()
    .setTitle(`Commands for ${client.user.username}`)
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setColor(re.config.color)
    let modulecommands = []
    // client.commands.forEach(command => {
    //   if(command.help.module === "bot"){
    //     if(!modulecommands.find(c => c == command.help.name)){
    //       modulecommands.push(command.help.name)
    //     }
    //   }
    // })
    // let serverprefix = re.dbs.settings.get(message.guild.id+".prefix") || re.config.prefix
    // embed.addField(`**Bot:**`, `${serverprefix}${modulecommands.join("\n" + serverprefix)}`, true)
    re.config.modules.forEach(module => {
      let modulecommands = []
      client.commands.forEach(command => {
        if(command.help.module === module){
          if(!modulecommands.find(c => c == command.help.name)){
            modulecommands.push(command.help.name)
          }
        }
      })
      let serverprefix = re.config.prefix
      if(module == "bot") embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, `${serverprefix}${modulecommands.join("\n" + serverprefix)}`, true)
      if(module == "player" && message.member.roles.cache.find(r => r.name === "Player")) embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, `${serverprefix}${modulecommands.join("\n" + serverprefix)}`, true)
      if(module == "gm" && message.member.roles.cache.find(r => r.name === "GM" || r.name === "Co-GM")) embed.addField(`**${module.toUpperCase()}:**`, `${serverprefix}${modulecommands.join("\n" + serverprefix)}`, true)
      if(module == "dev" && message.author.id === re.config.ownerID) embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, `${serverprefix}${modulecommands.join("\n" + serverprefix)}`, true)
    })
    message.channel.send(embed)
  }
  else{
    let props = client.commands.get(command);
    if (!props || props.help.name == "secretphrasetousefordmmessages")
      return message.channel.send("Sorry, I couldn't find that command");
    let embed = message.foxyEmbedObj
      embed.title = `Command info for ${command}`
      embed.author = { 
        name:message.author.tag, 
        icon_url:message.author.avatarURL() 
      }
      embed.fields = [
        {
          title:`Description:`, 
          value:`${props.help.description}`
        },
        {
          name:`Syntax:`, 
          value:`\`${props.help.syntax}\``
        },
        {
          name:`Module:`, 
          value:`${props.help.module}`
        }
      ]
    if (props.help.access.premium)
      embed.description("This is a premium command!");
    if (props.help.access.dev) embed.description("This is a dev command!");
    if (props.help.access.gm) embed.description("This is a GM command!");
    if (props.help.access.player) embed.description("This is a player-only command!");
    if (props.help.alias && props.help.alias.length > 0)
      embed.fields.push({
        name: `Aliases:`,
        value: `\`${re.prefix}${props.help.alias.join("`, `" + re.prefix)}\``
});
    message.channel.send(embed);
  }
};

module.exports.help = {
  name: "help",
  description: "Get help for any command, or list all commands",
  syntax: re.prefix + "help <command>",
  alias: ["command"],
  module: "bot",
  access: {player: false, gm: false, dev: false}
};
