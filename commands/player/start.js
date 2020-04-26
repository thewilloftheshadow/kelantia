const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  const start = { channel: null, name: null, avatar: null, backstory: null}
  message.member = client.guilds.cache.get(re.config.server)
  let channel = await client.guilds.cache.get(re.config.server).channels.create(message.author.username, {
    parent: re.config.playercat,
    permissionOverwrites: [
      {
        id: message.author.id,
        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
      },
      {
        id: re.config.server,
        deny: ["VIEW_CHANNEL"]
      }
    ]
  })
  let player = start
  player.channel = channel.id
  re.dbs.players.set(message.author.id, player)
  //channel.send(`<@${message.author.id}>`)
  //channel.send(JSON.stringify(re.dbs.players.get(message.author.id), null, 4), {"code": "js", "split": ","})
  message.author.send(`Awesome! Check out <#${channel.id}> to get started!`)
  channel.send(
    `Welcome to the Island of Kelantia <@${message.author.id}>! What is your character's name?`
  )
  let name = null
  while (!name) {
    let getname = await channel
      .awaitMessages(msg => msg.author.id === message.author.id, {
        time: 60 * 1000,
        max: 1,
        errors: ["time"]
      })
      .catch(() => {})
    if (!getname)
      return channel.send(`Hmm... I didn't catch that. Contact a GM for help!`)
    name = getname.first().content
    if (name.length > 30) {
      await channel.send(
        "This name is too long! The maximum number of characters is 30!"
      )
      name = null
    }
  }
  channel.send(`Awesome! Welcome to the island ${name}!`)
  message.member.setNickname(name, "Joined RPG")
  re.dbs.players.set(message.author.id + ".name", name)
  channel.send(`How old is ${name}?`)
  let age = null
  while (!age) {
    let getage = await channel
    .awaitMessages(msg => msg.author.id === message.author.id, {
      time: 60 * 1000,
      max: 1,
      errors: ["time"]
    })
    .catch(() => {})
    if (!getage)
      return channel.send(`Hmm... I didn't catch that. Contact a GM for help!`)
    age = getage.first().content
  }
  re.dbs.players.set(message.author.id + ".age", age)
  channel.send(
    `Nice! What is ${name}'s lifestyle (fisher, carpenter, hunter, farmer, etc)?`
  )
  let lifestyle = null
  while (!lifestyle) {
    let getlifestyle = await channel
      .awaitMessages(msg => msg.author.id === message.author.id, {
        time: 60 * 1000,
        max: 1,
        errors: ["time"]
      })
      .catch(() => {})
    if (!getlifestyle)
      return channel.send(`Hmm... I didn't catch that. Contact a GM for help!`)
    lifestyle = getlifestyle.first().content
  }
  channel.send(`Cool!`)
  re.dbs.players.set(message.author.id + ".lifestyle", lifestyle)
  channel.send(
    `Can you give us a couple sentences about your character's personality?`
  )
  let personality = null
  while (!personality) {
    let getpersonality = await channel
      .awaitMessages(msg => msg.author.id === message.author.id, {
        time: 60 * 1000,
        max: 1,
        errors: ["time"]
      })
      .catch(() => {})
    if (!getpersonality)
      return channel.send(`Hmm... I didn't catch that. Contact a GM for help!`)
    personality = getpersonality.first().content
  }
  channel.send(`Cool!`)
  re.dbs.players.set(message.author.id + ".personality", personality)
  let m2 = await channel.send(
    `What is your character's backstory? If you don't want to put one, just say \`None\``
  )
  let backstory = null
  while (!backstory) {
      let getbackstory = await channel
        .awaitMessages(msg => msg.author.id === message.author.id, {
          time: 60 * 1000,
          max: 1,
          errors: ["time"]
        })
        .catch(() => {})
      if (!getbackstory)
        return channel.send(
          `Hmm... I didn't catch that. Contact a GM for help!`
        )
      backstory = getbackstory.first().content
      re.dbs.players.set(message.author.id + ".backstory", backstory)
    }
  
  channel.send(JSON.stringify(re.dbs.players.get(message.author.id), null, 4), {"code": "js", "split": ","})
  message.member.roles.add(re.client.guilds.cache.get(re.config.server).roles.cache.find(r => r.name === "Player"))
  message.member.roles.add(re.client.guilds.cache.get(re.config.server).roles.cache.find(r => r.name === "Harbor"))
  let p = re.dbs.players.get(message.author.id)
  let pe = new re.Discord.MessageEmbed().setDescription(`Name:\n${p.name}\n\nAge:\n${p.age}\n\nLifestyle:\n${p.lifestyle}\n\nPersonality:\n${p.personality}\n\n${p.backstory ? `Backstory:\n${p.backstory}` : ""}`)
  .setTitle(`New character from ${message.author.tag}!`)
  .setThumbnail(message.author.avatarURL())
  .setColor(re.config.color)
  .setTimestamp()
  channel.send(pe)
  re.client.channels.cache.get("702910605736280075").send(pe)
  re.client.emit("kelantialog", pe)
  //await re.func.startboat(message.member)
  channel.send(`\n\nCongrats! You are now in the Kelantia RPG. Your first location is the <#703850107287764993>, where a boat will be to pick you up soon! Until then, you can chat with others in the harbor or just wait until your ride is here.`)
}

module.exports.help = {
  name: "start",
  description: "Join us on Kelantia",
  syntax: re.config.prefix + "start",
  alias: [],
  module: "player",
  access: { player: false, gm: false, dev: false },
  nohelp: true
}
