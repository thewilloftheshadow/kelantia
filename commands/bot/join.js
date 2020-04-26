const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.react("✅")
  let m = await message.author.send(
    `Hi there! We're so glad that you've decided to join us in the Island of Kelantia RPG! To start, you will need these things:\n\n1) Your character's name\n2) Your character's lifestyle (fisher, carpenter, hunter, farmer, etc)\n3) A couple sentences about your character's personality\n4) Information about your character's backstory (optional, Lana please don't write a 10 page thesis for your character XD)\nIf you're worried that you don't know what to put because you don't know enough about the RPG, its mostly an open-world RPG, all outdoors, and will involve physical and mental challenges.\n\nIf you have these things and are ready, react below with a ✅. If you want to wait and get your information first, just react with ❌`
  )
}

module.exports.help = {
  name: "join",
  description: "Join us on Kelantia",
  syntax: re.config.prefix + "join",
  alias: [],
  module: "bot",
  access: { player: false, gm: false, dev: false }
}
