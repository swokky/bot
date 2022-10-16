const { con } = require("./database/connection");
const fs = require("fs");
const permissions = [];

exports.registerDatabasePermission = () => {
  let commandsFolder = fs
    .readdirSync("./permission")
    .filter((file) => file.endsWith(".js"));

  commandsFolder.forEach((file) => {
    const { permission } = require(`./permission/${file}`);
    var sql = `INSERT INTO permission (permissionName, permissionDescription, permission, parentPermission) VALUES ('${permission.name}', '${permission.description}', '${permission.permission}', '${permission.parentPermission}')`;
    con.query(
      `SELECT * FROM permission WHERE permissionName = '${permission.name}'`,
      (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
          con.query(sql, (err, result) => {
            if (err) throw err;
            console.log(`Permission ${permission.name} registered !`);
          });
        }
      }
    );
  });
};
