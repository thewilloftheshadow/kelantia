const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let user = await re.unb.getUserBalance(re.config.server, message.author.id)
  let p = re.dbs.players.get(message.author.id) || {}
  message.channel.send((user.cash === "Infinity" || user.bank === "Infinity") ? "You have infinite money!" : `You have ${user.cash} money on you, ${p.house ? `, and ${user.bank} stashed at home, ` : ``}for a total of ${user.total}.`)
};

module.exports.help = {
  name: "stats",
  description: "Get your player stats",
  syntax: re.config.prefix + "stats",
  alias: ["stat", "s"],
  module: "player",
  access: {player: true, gm: false, dev: false}
};


  