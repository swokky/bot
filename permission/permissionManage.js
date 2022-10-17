const { Permission } = require("./permissionCreate.d.ts");

// Create the permission "permissionManage"
exports.permission = new Permission(
  "manage",
  "manage the permissions of a user",
  "manage",
  "permission"
);
