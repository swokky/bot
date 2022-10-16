// permission class for create
class Permission{

    constructor(name, description, permission, parentPermission,) {
        this.name = name;
        this.description = description;
        this.permission = permission;
        this.parentPermission = parentPermission;
    };

}

exports.Permission = Permission;