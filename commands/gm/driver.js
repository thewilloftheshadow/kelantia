const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.delete()
  re.driver.send(args.join(" "))
};

module.exports.help = {
  name: "driver",
  description: "Make the boat driver say something",
  syntax: re.config.prefix + "driver <message>",
  alias: ["boatdriver"],
  module: "gm",
  access: {player: false, gm: true, dev: false}
};
