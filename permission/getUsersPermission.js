const { Permission } = require("./permissionCreate.d.ts");

// Create the permission "getUsersPermission"
exports.permission = new Permission(
  "getUserPermission",
  "get the permissions of a user",
  "getUserPermission",
  "permission.manage"
);
