"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Permission = /** @class */ (function () {
    function Permission(name, value, groupName, description) {
        this.name = name;
        this.value = value;
        this.groupName = groupName;
        this.description = description;
    }
    Permission.viewUsersPermission = 'users.view';
    Permission.manageUsersPermission = 'users.manage';
    Permission.viewRolesPermission = 'roles.view';
    Permission.manageRolesPermission = 'roles.manage';
    Permission.assignRolesPermission = 'roles.assign';
    Permission.viewTasksPermission = 'tasks.view';
    Permission.setStatusTasksPremission = 'tasks.setStatus';
    return Permission;
}());
exports.Permission = Permission;
//# sourceMappingURL=permission.model.js.map