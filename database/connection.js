const mysql = require("mysql");
const configIni = require("config.ini");
const fs = require("fs");

//define the config.ini file
const conf = configIni.parse(fs.readFileSync("./config.ini", "utf-8"));

//define the connection to the database
var con = mysql.createConnection({
  host: conf.Database.host,
  user: conf.Database.user,
  password: conf.Database.password,
  database: conf.Database.database,
});

//connect to the database
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the database !");
});

//export the connection
exports.con = con;
