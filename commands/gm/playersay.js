const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.delete()
  let hook = await re.func.playerWebhook(re.func.getuser(args[0]), message.mentions.channels.first().id)
  hook.send(args.slice(2).join(" "))
};

module.exports.help = {
  name: "playersay",
  description: "Says a message as a player",
  syntax: re.config.prefix + "playersay <user> <channel> <message>",
  alias: ["psay"],
  module: "gm",
  access: {player: false, gm: true, dev: false}
};
