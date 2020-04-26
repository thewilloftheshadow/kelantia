const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  const m = await message.channel.send("Ping?");
  let embed = {
    title:`:ping_pong: **Pong!**`,
    author:{
      name:client.user.tag,
      icon_url:client.user.avatarURL()
    },
    fields:[
      {
        name:`**Latency:** \u200b \u200b \u200b \u200b \u200b \u200b \u200b`,
        value:`\`${m.createdTimestamp - message.createdTimestamp}ms\``,
        inline:true
      },
      {
        name:`**Api Latency:**`,
        value:`\`${Math.round(client.ws.ping)}ms\``,
        inline:true
      },
      {
        name:`**Memory Usage:**`,
        value:`\`${re.func.getMemoryUsage()}mb\``,
        inline:true
      }
    ]
  }
  m.edit(``, { embed })
};

module.exports.help = {
  name: "ping",
  description: "Tests the ping of the bot",
  syntax: re.config.prefix + "ping",
  alias: ["pong", "test"],
  module: "bot",
  access: {player: false, gm: false, dev: false}
};
