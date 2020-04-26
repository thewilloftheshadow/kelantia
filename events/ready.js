const re = require("../resources.js").data

re.client.on("ready", () => {
  console.log(
    `${re.client.user.tag} has started, with ${re.client.users.cache.size} users, in ${re.client.channels.cache.size} channels of ${re.client.guilds.cache.size} guilds.`
  );
  re.client.emit('kelantialog', 
    `${re.client.user.tag} has started, with ${re.client.users.cache.size} users, in ${re.client.channels.cache.size} channels of ${re.client.guilds.cache.size} guilds.`
  );
  re.client.user.setActivity(`the weather on Kelantia`, {
    type: "WATCHING"
  });
  // console.log("Servers:");
  // re.client.guilds.cache.forEach(guild => {
  //   console.log(" - " + guild.name);
  //   guild.channels.cache.forEach(channel =>
  //     console.log("   - " + channel.name + " (" + channel.id + ")")
  //   );
  // });
});