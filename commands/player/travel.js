const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let p = re.dbs.players.get(message.author.id)
  let allchannels = message.guild.channels.cache.filter(c => c.parentID === "667995346026102784")
  let channels = ["off-island"]
  allchannels.forEach(c => channels.push(c.name.toLowerCase()))
  console.log(channels)
  if(!args[0]) return message.channel.send("Please specify a location to travel to!")
  if(!channels.includes(args[0].toLowerCase())) return message.channel.send(`Invalid location!`)
  if(args[0] === "boat" && !message.member.roles.cache.find(r => r.name === "Off-Island")) return message.channel.send("You cannot leave the island!")
  if(args[0] === "off-island") return message.channel.send("You cannot leave the island!")
  let locrole = await message.guild.roles.cache.find(r => r.name.toLowerCase() === args[0])
  console.log(locrole)
  channels.forEach(c => {
    let role = message.guild.roles.cache.find(r => r.name.toLowerCase() === c)
    message.member.roles.remove(role).catch(()=>{})
  })
  message.member.roles.add(locrole)
  let locchan = message.guild.channels.cache.find(c => c.name.toLowerCase() === args[0])
  locchan.send(`${p.name} has arrived`)
  message.channel.send(`${p.name} has departed to the ${args[0]}`)
};

module.exports.help = {
  name: "travel",
  description: "Travel to another location in the RPG",
  syntax: re.config.prefix + "travel <place>",
  alias: ["t"],
  module: "player",
  access: {player: true, gm: false, dev: false}
};


  