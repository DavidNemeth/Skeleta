"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var account_endpoint_service_1 = require("./account-endpoint.service");
var auth_service_1 = require("./auth.service");
var AccountService = /** @class */ (function () {
    function AccountService(router, http, authService, accountEndpoint) {
        this.router = router;
        this.http = http;
        this.authService = authService;
        this.accountEndpoint = accountEndpoint;
        this._rolesChanged = new rxjs_1.Subject();
    }
    AccountService_1 = AccountService;
    AccountService.prototype.getUser = function (userId) {
        return this.accountEndpoint.getUserEndpoint(userId);
    };
    AccountService.prototype.getUserAndRoles = function (userId) {
        return rxjs_1.forkJoin(this.accountEndpoint.getUserEndpoint(userId), this.accountEndpoint.getRolesEndpoint());
    };
    AccountService.prototype.getUsers = function (page, pageSize) {
        return this.accountEndpoint.getUsersEndpoint(page, pageSize);
    };
    AccountService.prototype.getActiveUsers = function (page, pageSize) {
        return this.accountEndpoint.getActiveUsersEndpoint(page, pageSize);
    };
    AccountService.prototype.getUsersAndRoles = function (page, pageSize) {
        return rxjs_1.forkJoin(this.accountEndpoint.getUsersEndpoint(page, pageSize), this.accountEndpoint.getRolesEndpoint());
    };
    AccountService.prototype.updateUser = function (user) {
        var _this = this;
        if (user.id) {
            return this.accountEndpoint.getUpdateUserEndpoint(user, user.id);
        }
        else {
            return this.accountEndpoint.getUserByUserNameEndpoint(user.userName).pipe(operators_1.mergeMap(function (foundUser) {
                user.id = foundUser.id;
                return _this.accountEndpoint.getUpdateUserEndpoint(user, user.id);
            }));
        }
    };
    AccountService.prototype.newUser = function (user) {
        return this.accountEndpoint.getNewUserEndpoint(user);
    };
    AccountService.prototype.getUserPreferences = function () {
        return this.accountEndpoint.getUserPreferencesEndpoint();
    };
    AccountService.prototype.updateUserPreferences = function (configuration) {
        return this.accountEndpoint.getUpdateUserPreferencesEndpoint(configuration);
    };
    AccountService.prototype.deleteUser = function (userOrUserId) {
        var _this = this;
        if (typeof userOrUserId === 'string' || userOrUserId instanceof String) {
            return this.accountEndpoint.getDeleteUserEndpoint(userOrUserId).pipe(operators_1.tap(function (data) { return _this.onRolesUserCountChanged(data.roles); }));
        }
        else {
            if (userOrUserId.id) {
                return this.deleteUser(userOrUserId.id);
            }
            else {
                return this.accountEndpoint.getUserByUserNameEndpoint(userOrUserId.userName).pipe(operators_1.mergeMap(function (user) { return _this.deleteUser(user.id); }));
            }
        }
    };
    AccountService.prototype.unblockUser = function (userId) {
        return this.accountEndpoint.getUnblockUserEndpoint(userId);
    };
    AccountService.prototype.userHasPermission = function (permissionValue) {
        return this.permissions.some(function (p) { return p == permissionValue; });
    };
    AccountService.prototype.refreshLoggedInUser = function () {
        return this.authService.refreshLogin();
    };
    AccountService.prototype.getRoles = function (page, pageSize) {
        return this.accountEndpoint.getRolesEndpoint(page, pageSize);
    };
    AccountService.prototype.getRolesAndPermissions = function (page, pageSize) {
        return rxjs_1.forkJoin(this.accountEndpoint.getRolesEndpoint(page, pageSize), this.accountEndpoint.getPermissionsEndpoint());
    };
    AccountService.prototype.updateRole = function (role) {
        var _this = this;
        if (role.id) {
            return this.accountEndpoint.getUpdateRoleEndpoint(role, role.id).pipe(operators_1.tap(function (data) { return _this.onRolesChanged([role], AccountService_1.roleModifiedOperation); }));
        }
        else {
            return this.accountEndpoint.getRoleByRoleNameEndpoint(role.name).pipe(operators_1.mergeMap(function (foundRole) {
                role.id = foundRole.id;
                return _this.accountEndpoint.getUpdateRoleEndpoint(role, role.id);
            }), operators_1.tap(function (data) { return _this.onRolesChanged([role], AccountService_1.roleModifiedOperation); }));
        }
    };
    AccountService.prototype.newRole = function (role) {
        var _this = this;
        return this.accountEndpoint.getNewRoleEndpoint(role).pipe(operators_1.tap(function (data) { return _this.onRolesChanged([role], AccountService_1.roleAddedOperation); }));
    };
    AccountService.prototype.deleteRole = function (roleOrRoleId) {
        var _this = this;
        if (typeof roleOrRoleId === 'string' || roleOrRoleId instanceof String) {
            return this.accountEndpoint.getDeleteRoleEndpoint(roleOrRoleId).pipe(operators_1.tap(function (data) { return _this.onRolesChanged([data], AccountService_1.roleDeletedOperation); }));
        }
        else {
            if (roleOrRoleId.id) {
                return this.deleteRole(roleOrRoleId.id);
            }
            else {
                return this.accountEndpoint.getRoleByRoleNameEndpoint(roleOrRoleId.name).pipe(operators_1.mergeMap(function (role) { return _this.deleteRole(role.id); }));
            }
        }
    };
    AccountService.prototype.getPermissions = function () {
        return this.accountEndpoint.getPermissionsEndpoint();
    };
    AccountService.prototype.onRolesChanged = function (roles, op) {
        this._rolesChanged.next({ roles: roles, operation: op });
    };
    AccountService.prototype.onRolesUserCountChanged = function (roles) {
        return this.onRolesChanged(roles, AccountService_1.roleModifiedOperation);
    };
    AccountService.prototype.getRolesChangedEvent = function () {
        return this._rolesChanged.asObservable();
    };
    Object.defineProperty(AccountService.prototype, "permissions", {
        get: function () {
            return this.authService.userPermissions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountService.prototype, "currentUser", {
        get: function () {
            return this.authService.currentUser;
        },
        enumerable: true,
        configurable: true
    });
    var AccountService_1;
    AccountService.roleAddedOperation = 'add';
    AccountService.roleDeletedOperation = 'delete';
    AccountService.roleModifiedOperation = 'modify';
    AccountService = AccountService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, http_1.HttpClient, auth_service_1.AuthService,
            account_endpoint_service_1.AccountEndpoint])
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map