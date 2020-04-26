const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let buyhouse = message.guild.roles.cache.find(r => r.name === "BuyHouse")
  if(!message.member.roles.cache.has(buyhouse)) return await message.channel.send("You haven't bought a house!")
};

module.exports.help = {
  name: "gethouse",
  description: "Redeem the house you bought",
  syntax: re.config.prefix + "gethouse",
  alias: ["gh"],
  module: "player",
  access: {player: true, gm: false, dev: false}
};


  