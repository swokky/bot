const { con } = require("../database/connection");
const { v4: uuidv4 } = require("uuid");

exports.guildDatabaseCheck = (guildId, guildName) => {
  // Check if the guild is already in the database
  var uuid = null;
  // Get the guild from the database if it exists or create it if it doesn't
  con.query(
    "SELECT * FROM guild WHERE guildId = '" + guildId + "'",
    (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        while (uuid === null) {
          uuid = uuidv4().slice(0, 8);
          con.query(
            "SELECT * FROM guild WHERE guildId = '" + uuid + "'",
            (err, result) => {
              if (err) throw err;
              if (result.length !== 0) {
                uuid = null;
              }
            }
          );
        }
        // If the guild is not in the database, add it
        con.query(
          "INSERT INTO guild (guildId, guildName, uuid) VALUES ('" +
            guildId +
            "', '" +
            guildName +
            "', '" +
            uuid +
            "')",
          (err, result) => {
            if (err) throw err;
          }
        );
        // Create a table for the guild if it doesn't exist
        con.query(
          "CREATE TABLE IF NOT EXISTS " +
            uuid +
            " (userId VARCHAR(255), userName VARCHAR(255), userPermissions JSON)",
          (err, result) => {
            if (err) throw err;
          }
        );
      }
    }
  );
};
