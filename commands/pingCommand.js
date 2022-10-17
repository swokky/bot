// File for the ping command

const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");

// Define the command
exports.data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("reply with the ping of the bot")
  .toJSON();

// Execute the command
// This function will be called in the deployer.js file when the bot will receive an interaction named ping
exports.command = {
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const dateReceived = Date.now();
    await interaction.reply({
      content: "Loading...",
      ephemeral: true,
    });
    await interaction.editReply({
      content: `latency of : ${Date.now() - dateReceived}ms`,
      ephemeral: true,
    });
  },
};
