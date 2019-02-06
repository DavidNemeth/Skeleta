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
var UserManagementComponent = /** @class */ (function () {
    function UserManagementComponent(alertService, translationService, accountService) {
        this.alertService = alertService;
        this.translationService = translationService;
        this.accountService = accountService;
        this.columns = [];
        this.users = [];
        this.usersCache = [];
        this.rowSelected = [];
        this.allRoles = [];
    }
    UserManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        var gT = function (key) { return _this.translationService.getTranslation(key); };
        this.loadData();
    };
    UserManagementComponent.prototype.ngAfterViewInit = function () {
        //this.userEditor.changesSavedCallback = () => {
        //  this.addNewUserToList();
        //};
        //this.userEditor.changesCancelledCallback = () => {
        //  this.editedUser = null;
        //  this.sourceUser = null;
        //};
    };
    //TODO
    UserManagementComponent.prototype.addNewUserToList = function () {
        //if (this.sourceUser) {
        //  Object.assign(this.sourceUser, this.editedUser);
        //  let sourceIndex = this.rowsCache.indexOf(this.sourceUser, 0);
        //  if (sourceIndex > -1)
        //    Utilities.moveArrayItem(this.rowsCache, sourceIndex, 0);
        //  sourceIndex = this.rows.indexOf(this.sourceUser, 0);
        //  if (sourceIndex > -1)
        //    Utilities.moveArrayItem(this.rows, sourceIndex, 0);
        //  this.editedUser = null;
        //  this.sourceUser = null;
        //}
        //else {
        //  const user = new User();
        //  Object.assign(user, this.editedUser);
        //  this.editedUser = null;
        //  let maxIndex = 0;
        //  for (const u of this.rowsCache) {
        //    if ((<any>u).index > maxIndex)
        //      maxIndex = (<any>u).index;
        //  }
        //  (<any>user).index = maxIndex + 1;
        //  this.rowsCache.splice(0, 0, user);
        //  this.rows.splice(0, 0, user);
        //  this.rows = [...this.rows];
        //}
    };
    UserManagementComponent.prototype.loadData = function () {
        var _this = this;
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
    //TODO
    UserManagementComponent.prototype.newUser = function () {
        //this.editingUserName = null;
        //this.sourceUser = null;
        //this.editedUser = this.userEditor.newUser(this.allRoles);
        //this.editorModal.show();
    };
    UserManagementComponent.prototype.editUser = function (row) {
        //this.editingUserName = { name: row.userName };
        //this.sourceUser = row;
        //this.editedUser = this.userEditor.editUser(row, this.allRoles);
        //this.editorModal.show();
    };
    UserManagementComponent.prototype.deleteUser = function (row) {
        var _this = this;
        this.alertService.showDialog('Are you sure you want to delete \"' + row.userName + '\"?', alert_service_1.DialogType.confirm, function () { return _this.deleteUserHelper(row); });
    };
    UserManagementComponent.prototype.deleteUserHelper = function (row) {
        var _this = this;
        this.alertService.startLoadingMessage('Deleting...');
        this.loadingIndicator = true;
        this.accountService.deleteUser(row)
            .subscribe(function (results) {
            _this.alertService.stopLoadingMessage();
            _this.loadingIndicator = false;
            _this.usersCache = _this.usersCache.filter(function (item) { return item !== row; });
            _this.users = _this.users.filter(function (item) { return item !== row; });
        }, function (error) {
            _this.alertService.stopLoadingMessage();
            _this.loadingIndicator = false;
            _this.alertService.showStickyMessage('Delete Error', "An error occured whilst deleting the user.\r\nError: \"" + utilities_1.Utilities.getHttpResponseMessage(error) + "\"", alert_service_1.MessageSeverity.error, error);
        });
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