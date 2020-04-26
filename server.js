const http = require("http");
const express = require("express");
const app = express();
app.use(express.static("public"));
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const Discord = require("discord.js");
const client = new Discord.Client()
const config = require("./config.json");
const db = require("quick.db");
const settings = new db.table("settings");
const cmd = require("node-cmd");

client.on("ready", () => {
  console.log(
    `${client.user.tag} has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`
  );
  client.user.setActivity(`the weather on Kelantia`, {
    type: "WATCHING"
  });
  console.log("Servers:");
  client.guilds.cache.forEach(guild => {
    console.log(" - " + guild.name);
    guild.channels.cache.forEach(channel =>
      console.log("   - " + channel.name + " (" + channel.id + ")")
    );
  });
});

client.on("message", async message => {
  if (message.author.bot) return;
  let everyone = message.guild.roles.cache.find(role => role.id === message.guild.id);
  let player = message.guild.roles.cache.find(role => role.name === "Player");
  let beach = message.guild.roles.cache.find(
    role => role.name === "Current Location: Beach"
  );
  let offisland = message.guild.roles.cache.find(
    role => role.name === "Current Location: Off-Island"
  );
  let cave = message.guild.roles.cache.find(
    role => role.name === "Current Location: Cave"
  );
  let forest = message.guild.roles.cache.find(
    role => role.name === "Current Location: Forest"
  );
  let boat = message.guild.roles.cache.find(
    role => role.name === "Current Location: Boat"
  );
  let mentionedUser = message.mentions.members.first();
  let mentionedChannel = message.mentions.channels.first();
  if (!mentionedUser) mentionedUser = message.author;

  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  if (command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(
      `Pong! Latency is ${m.createdTimestamp -
        message.createdTimestamp}ms. API Latency is ${Math.round(
        client.ping
      )}ms`
    );
  }

  if (message.member.roles.cache.some(role => role.name === "Player")) {
    if (command === "travel") {
      let location = args[0];
      let newrole;
      message.delete();
      if (location === "boat") newrole = boat;
      if (location === "beach") newrole = beach;
      if (location === "cave") newrole = cave;
      if (location === "forest") newrole = forest;
      if (!newrole)
        return message.author.send(
          "Error: unable to find location `" + location + "`"
        );
      message.author.send("Traveling to " + location);
      message.member.removeRole(beach);
      message.member.removeRole(cave);
      message.member.removeRole(offisland);
      message.member.removeRole(forest);
      message.member.removeRole(boat);
      message.member.addRole(newrole);
    }
  }

  if (message.member.roles.cache.find(role => ["GM", "CoGM"].includes(role.name))) {
    if (command === "radio") {
      let msg = args.join(" ");
      radio.send(msg);
      message.delete();
    }
    if (command === "say") {
      let msg = args.join(" ");
      message.channel.send(msg);
      message.delete();
    }
  }

  // Owner commands:

  if (command === "eval") {
    if (message.author.id !== config.ownerID) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), { code: "js" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});

client.login(process.env.TOKEN);

function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}

async function mutualservers(userid) {
  let mutualservers = [];
  await client.guilds.forEach(guild => {
    let guildobj = { name: guild.name, id: guild.id };
    let guildmember = guild.members.get(userid);
    if (guildmember) {
      mutualservers.push(guildobj);
    }
  });
  if (mutualservers === []) return false;
  return mutualservers;
}
