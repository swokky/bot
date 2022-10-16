const { Client, GatewayIntentBits } = require("discord.js");
const configIni = require("config.ini");
const fs = require("fs");
const { interactionDispacth } = require("./deployer");
const { status } = require("./setPresence/presence.js");
const { registerDatabasePermission } = require("./registerDatabasePermission");

// Define the intents that the bot will use
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Define the config.ini file
const conf = configIni.parse(fs.readFileSync("./config.ini", "utf-8"));

// login the bot
client.login(conf.Credential.token);

// This event will be triggered when the bot is ready
client.on("ready", () => {
  console.log(`${client.user.username} as succesfully logged in !`);
  status.execute(client);
  registerDatabasePermission();
});

// This event will be triggered when the bot receive an interaction
client.on("interactionCreate", (intercation) => {
  interactionDispacth.execute(intercation, client);
});
