const { Client, ActivityType } = require("discord.js");

// Change the status of the bot every 12 seconds
// It will change the status between 4 different status
exports.status = {
  /**
   * @param {Client} client
   */
  execute(client) {
    const arrayOfStatus = [
      `${client.guilds.cache.size} servers`,
      `${client.channels.cache.size} channels`,
      `${client.users.cache.size} users`,
      `${client.user.tag} discord bot!`,
    ];
    let i = 0;
    setInterval(() => {
      if (i === arrayOfStatus.length) i = 0;
      const status = arrayOfStatus[i];
      client.user.setPresence({
        activities: [{ name: status }],
      });
      i++;
    }, 12000);
  },
};
