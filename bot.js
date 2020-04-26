const re = require(`./resources.js`).data

re.app.use(re.vars.express.static("public"));
re.app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
re.app.listen(process.env.PORT);


re.client.on('ready', () => console.log('\nStarting bot...'));
//re.client.on('debug', m => console.debug(m));
re.client.on('warn', m => console.log(m));
re.client.on('error', m => console.error(m));
re.client.on('kelantialog', m => re.client.channels.cache.get(re.config.logs).send(m))

process.on('uncaughtException', error => console.error(error));

re.client.commands = new re.vars.Discord.Collection()

re.client.login(process.env.TOKEN);

require("./handlers")(re.client);
