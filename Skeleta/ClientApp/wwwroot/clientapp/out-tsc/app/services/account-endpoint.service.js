"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var endpoint_factory_service_1 = require("./endpoint-factory.service");
var configuration_service_1 = require("./configuration.service");
var AccountEndpoint = /** @class */ (function (_super) {
    __extends(AccountEndpoint, _super);
    function AccountEndpoint(http, configurations, injector) {
        var _this = _super.call(this, http, configurations, injector) || this;
        _this._usersUrl = '/api/account/users';
        _this._userByUserNameUrl = '/api/account/users/username';
        _this._currentUserUrl = '/api/account/users/me';
        _this._currentUserPreferencesUrl = '/api/account/users/me/preferences';
        _this._unblockUserUrl = '/api/account/users/unblock';
        _this._rolesUrl = '/api/account/roles';
        _this._roleByRoleNameUrl = '/api/account/roles/name';
        _this._permissionsUrl = '/api/account/permissions';
        return _this;
    }
    Object.defineProperty(AccountEndpoint.prototype, "usersUrl", {
        get: function () { return this.configurations.baseUrl + this._usersUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountEndpoint.prototype, "userByUserNameUrl", {
        get: function () { return this.configurations.baseUrl + this._userByUserNameUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountEndpoint.prototype, "currentUserUrl", {
        get: function () { return this.configurations.baseUrl + this._currentUserUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountEndpoint.prototype, "currentUserPreferencesUrl", {
        get: function () { return this.configurations.baseUrl + this._currentUserPreferencesUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountEndpoint.prototype, "unblockUserUrl", {
        get: function () { return this.configurations.baseUrl + this._unblockUserUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountEndpoint.prototype, "rolesUrl", {
        get: function () { return this.configurations.baseUrl + this._rolesUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountEndpoint.prototype, "roleByRoleNameUrl", {
        get: function () { return this.configurations.baseUrl + this._roleByRoleNameUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccountEndpoint.prototype, "permissionsUrl", {
        get: function () { return this.configurations.baseUrl + this._permissionsUrl; },
        enumerable: true,
        configurable: true
    });
    AccountEndpoint.prototype.getUserEndpoint = function (userId) {
        var _this = this;
        var endpointUrl = userId ? this.usersUrl + "/" + userId : this.currentUserUrl;
        return this.http.get(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getUserEndpoint(userId); });
        }));
    };
    AccountEndpoint.prototype.getUserByUserNameEndpoint = function (userName) {
        var _this = this;
        var endpointUrl = this.userByUserNameUrl + "/" + userName;
        return this.http.get(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getUserByUserNameEndpoint(userName); });
        }));
    };
    AccountEndpoint.prototype.getUsersEndpoint = function (page, pageSize) {
        var _this = this;
        var endpointUrl = page && pageSize ? this.usersUrl + "/" + page + "/" + pageSize : this.usersUrl;
        return this.http.get(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getUsersEndpoint(page, pageSize); });
        }));
    };
    AccountEndpoint.prototype.getNewUserEndpoint = function (userObject) {
        var _this = this;
        return this.http.post(this.usersUrl, JSON.stringify(userObject), this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getNewUserEndpoint(userObject); });
        }));
    };
    AccountEndpoint.prototype.getUpdateUserEndpoint = function (userObject, userId) {
        var _this = this;
        var endpointUrl = userId ? this.usersUrl + "/" + userId : this.currentUserUrl;
        return this.http.put(endpointUrl, JSON.stringify(userObject), this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getUpdateUserEndpoint(userObject, userId); });
        }));
    };
    AccountEndpoint.prototype.getPatchUpdateUserEndpoint = function (valueOrPatch, opOrUserId, path, from, userId) {
        var _this = this;
        var endpointUrl;
        var patchDocument;
        if (path) {
            endpointUrl = userId ? this.usersUrl + "/" + userId : this.currentUserUrl;
            patchDocument = from ?
                [{ 'value': valueOrPatch, 'path': path, 'op': opOrUserId, 'from': from }] :
                [{ 'value': valueOrPatch, 'path': path, 'op': opOrUserId }];
        }
        else {
            endpointUrl = opOrUserId ? this.usersUrl + "/" + opOrUserId : this.currentUserUrl;
            patchDocument = valueOrPatch;
        }
        return this.http.patch(endpointUrl, JSON.stringify(patchDocument), this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getPatchUpdateUserEndpoint(valueOrPatch, opOrUserId, path, from, userId); });
        }));
    };
    AccountEndpoint.prototype.getUserPreferencesEndpoint = function () {
        var _this = this;
        return this.http.get(this.currentUserPreferencesUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getUserPreferencesEndpoint(); });
        }));
    };
    AccountEndpoint.prototype.getUpdateUserPreferencesEndpoint = function (configuration) {
        var _this = this;
        return this.http.put(this.currentUserPreferencesUrl, JSON.stringify(configuration), this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getUpdateUserPreferencesEndpoint(configuration); });
        }));
    };
    AccountEndpoint.prototype.getUnblockUserEndpoint = function (userId) {
        var _this = this;
        var endpointUrl = this.unblockUserUrl + "/" + userId;
        return this.http.put(endpointUrl, null, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getUnblockUserEndpoint(userId); });
        }));
    };
    AccountEndpoint.prototype.getDeleteUserEndpoint = function (userId) {
        var _this = this;
        var endpointUrl = this.usersUrl + "/" + userId;
        return this.http.delete(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getDeleteUserEndpoint(userId); });
        }));
    };
    AccountEndpoint.prototype.getRoleEndpoint = function (roleId) {
        var _this = this;
        var endpointUrl = this.rolesUrl + "/" + roleId;
        return this.http.get(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getRoleEndpoint(roleId); });
        }));
    };
    AccountEndpoint.prototype.getRoleByRoleNameEndpoint = function (roleName) {
        var _this = this;
        var endpointUrl = this.roleByRoleNameUrl + "/" + roleName;
        return this.http.get(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getRoleByRoleNameEndpoint(roleName); });
        }));
    };
    AccountEndpoint.prototype.getRolesEndpoint = function (page, pageSize) {
        var _this = this;
        var endpointUrl = page && pageSize ? this.rolesUrl + "/" + page + "/" + pageSize : this.rolesUrl;
        return this.http.get(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getRolesEndpoint(page, pageSize); });
        }));
    };
    AccountEndpoint.prototype.getNewRoleEndpoint = function (roleObject) {
        var _this = this;
        return this.http.post(this.rolesUrl, JSON.stringify(roleObject), this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getNewRoleEndpoint(roleObject); });
        }));
    };
    AccountEndpoint.prototype.getUpdateRoleEndpoint = function (roleObject, roleId) {
        var _this = this;
        var endpointUrl = this.rolesUrl + "/" + roleId;
        return this.http.put(endpointUrl, JSON.stringify(roleObject), this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getUpdateRoleEndpoint(roleObject, roleId); });
        }));
    };
    AccountEndpoint.prototype.getDeleteRoleEndpoint = function (roleId) {
        var _this = this;
        var endpointUrl = this.rolesUrl + "/" + roleId;
        return this.http.delete(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getDeleteRoleEndpoint(roleId); });
        }));
    };
    AccountEndpoint.prototype.getPermissionsEndpoint = function () {
        var _this = this;
        return this.http.get(this.permissionsUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getPermissionsEndpoint(); });
        }));
    };
    AccountEndpoint = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, configuration_service_1.ConfigurationService, core_1.Injector])
    ], AccountEndpoint);
    return AccountEndpoint;
}(endpoint_factory_service_1.EndpointFactory));
exports.AccountEndpoint = AccountEndpoint;
//# sourceMappingURL=account-endpoint.service.js.map