const fs = require("fs");
const commands = [];
const { REST, Routes, Client } = require("discord.js");
const configIni = require("config.ini");

// Define the config.ini file
const conf = configIni.parse(fs.readFileSync("./config.ini", "utf-8"));

// Deploy the commands
// This function will be called in the index.js file
// It will deploy the commands in the guilds
const deploy = () => {
  let commandsFolder = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

  commandsFolder.forEach((file) => {
    const command = require(`./commands/${file}`);
    commands.push(command.data);
    console.log("Successfully added 1 command");
  });
};

// Dispatch the commands
// This function will be called in the index.js file
// It will dispatch the commands that the users type in the chat
exports.interactionDispacth = {
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    const {
      command,
    } = require(`./commands/${interaction.commandName}Command.js`);
    command.execute(interaction, client);
  },
};

// Register the commands with the discord api REST
const rest = new REST({ version: "10" }).setToken(conf.Credential.token);

(async () => {
  if (commands.length <= 0) deploy();
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data = await rest.put(
      Routes.applicationGuildCommands(
        conf.Credential.clientId,
        conf.Credential.guildId
      ),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();

// Export the deploy function
exports.deploy = deploy;
