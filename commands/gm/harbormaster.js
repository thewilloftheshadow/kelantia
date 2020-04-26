const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.delete()
  re.harbormaster.send(args.join(" "))
};

module.exports.help = {
  name: "harbormaster",
  description: "Make the harbormaster say something",
  syntax: re.config.prefix + "harbormaster <message>",
  alias: ["harbor"],
  module: "gm",
  access: {player: false, gm: true, dev: false}
};