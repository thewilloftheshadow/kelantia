const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.delete().catch(()=>{})
  //await re.func.sleep(3000)
  // let userid = args[0]
  // console.log(userid)
  // if(!userid){
  //   let msgs = await message.channel.messages.fetch({limit: 5})
  //   msgs.filter(m => m.content.toLowerCase().includes("home area"))
  //   console.log(msgs.first())
  //   userid = msgs.first().author.id
  // }
  // let user = await message.guild.members.cache.get(userid)
  // console.log(user)
  // await re.func.sleep(2000)
  let user = message.member
  if(!user.roles.cache.find(r => r.name === "BuyHome")) return console.log("x")
  let m = await user.send("What would you like to name your home area?")
  let name = null
  while (!name) {
    let getname = await m.channel
      .awaitMessages(msg => msg.author.id === user.id, {
        time: 60 * 1000,
        max: 1,
        errors: ["time"]
      })
      .catch(() => {})
    if (!getname)
      return user.send(`Hmm... I didn't catch that. Contact a GM for help!`)
    name = getname.first().content
    if (name.length > 50) {
      await user.send(
        "This name is too long! The maximum number of characters is 50! If you want something longer, type in a short name and then ask a GM to change it to the long name you want."
      )
      name = null
    }
  }
  let channel = await client.guilds.cache.get(re.config.server).channels.create(name.toLowerCase().replace(/ /g, "-"), {
    parent: re.config.homecat,
    permissionOverwrites: [
      {
        id: user.id,
        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
      },
      {
        id: re.config.server,
        deny: ["VIEW_CHANNEL"]
      }
    ]
  })
  re.dbs.players.set(user.id+".home", channel.id)
  user.send(`<#${channel.id}>`)
  re.client.emit("kelantialog", `${user} has just bought a home area: ${channel}\n${re.moment().format('MMMM Do YYYY, h:mm:ss a')}`)
};

module.exports.help = {
  name: "gethome",
  description: "Command for Unb to redeem house",
  syntax: re.config.prefix + "gethome <user id>",
  alias: [],
  module: "player",
  access: {player: true, gm: false, dev: false},
  botcmd: true,
  nohelp: true
};