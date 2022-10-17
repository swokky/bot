// File for the getUserPermission command

const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");
const { guildDatabaseCheck } = require("../utils/guildDatabaseCheck");

// Define the command
exports.data = {
  name: "getUserPermissions",
  type: 2,
};

// Execute the command
// This function will be called in the deployer.js file when the bot will receive an interaction named getUserPermission
exports.command = {
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    guildDatabaseCheck(interaction.guild.id, interaction.guild.name);
    interaction.reply("getUserPermission");
  },
};
