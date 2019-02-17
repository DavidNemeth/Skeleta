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
var alert_service_1 = require("../../../services/alert.service");
var app_translation_service_1 = require("../../../services/app-translation.service");
var account_service_1 = require("../../../services/account.service");
var utilities_1 = require("../../../services/utilities");
var role_model_1 = require("../../../models/role.model");
var permission_model_1 = require("../../../models/permission.model");
var user_edit_component_1 = require("../../controls/editors/user-edit/user-edit.component");
var UserManagementComponent = /** @class */ (function () {
    function UserManagementComponent(alertService, translationService, accountService) {
        this.alertService = alertService;
        this.translationService = translationService;
        this.accountService = accountService;
        this.columns = [];
        this.users = [];
        this.usersCache = [];
        this.selected = [];
        this.allRoles = [];
    }
    UserManagementComponent.prototype.ngOnInit = function () {
        this.loadData();
    };
    UserManagementComponent.prototype.ngAfterViewInit = function () {
    };
    UserManagementComponent.prototype.onAdd = function () {
        this.userEdit.newUser();
    };
    UserManagementComponent.prototype.onEdit = function () {
        this.userEdit.editUser(this.selected[0]);
    };
    UserManagementComponent.prototype.onDelete = function () {
        if (this.selected.length > 0) {
            this.userEdit.deleteUsers(this.selected);
        }
    };
    UserManagementComponent.prototype.onExportAll = function () {
    };
    UserManagementComponent.prototype.onExportSelected = function () {
    };
    UserManagementComponent.prototype.loadData = function () {
        var _this = this;
        this.users = [];
        this.usersCache = [];
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        if (this.canViewRoles) {
            this.accountService.getUsersAndRoles()
                .subscribe(function (results) { return _this.onDataLoadSuccessful(results[0], results[1]); }, function (error) { return _this.onDataLoadFailed(error); });
        }
        else {
            this.accountService.getUsers()
                .subscribe(function (users) { return _this.onDataLoadSuccessful(users, _this.accountService.currentUser.roles.map(function (x) { return new role_model_1.Role(x); })); }, function (error) { return _this.onDataLoadFailed(error); });
        }
    };
    UserManagementComponent.prototype.onDataLoadSuccessful = function (users, roles) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        users.forEach(function (user, index) {
            user.index = index + 1;
        });
        this.usersCache = users.slice();
        this.users = users;
        this.allRoles = roles;
    };
    UserManagementComponent.prototype.onDataLoadFailed = function (error) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.alertService.showStickyMessage('Load Error', "Unable to retrieve users from the server.\r\nErrors: \"" + utilities_1.Utilities.getHttpResponseMessage(error) + "\"", alert_service_1.MessageSeverity.error, error);
    };
    UserManagementComponent.prototype.onSearchChanged = function (value) {
        this.users = this.usersCache
            .filter(function (r) { return utilities_1.Utilities.searchArray(value, false, r.id, r.userName, r.fullName, r.email, r.phoneNumber, r.jobTitle, r.roles); });
    };
    Object.defineProperty(UserManagementComponent.prototype, "canAssignRoles", {
        get: function () {
            return this.accountService.userHasPermission(permission_model_1.Permission.assignRolesPermission);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserManagementComponent.prototype, "canViewRoles", {
        get: function () {
            return this.accountService.userHasPermission(permission_model_1.Permission.viewRolesPermission);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserManagementComponent.prototype, "canManageUsers", {
        get: function () {
            return this.accountService.userHasPermission(permission_model_1.Permission.manageUsersPermission);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild(user_edit_component_1.UserEditComponent),
        __metadata("design:type", Object)
    ], UserManagementComponent.prototype, "userEdit", void 0);
    UserManagementComponent = __decorate([
        core_1.Component({
            selector: 'app-user-management',
            templateUrl: './user-management.component.html',
            styleUrls: ['./user-management.component.css']
        }),
        __metadata("design:paramtypes", [alert_service_1.AlertService, app_translation_service_1.AppTranslationService,
            account_service_1.AccountService])
    ], UserManagementComponent);
    return UserManagementComponent;
}());
exports.UserManagementComponent = UserManagementComponent;
//# sourceMappingURL=user-management.component.js.map