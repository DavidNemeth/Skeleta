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
var role_model_1 = require("../../../models/role.model");
var permission_model_1 = require("../../../models/permission.model");
var alert_service_1 = require("../../../services/alert.service");
var app_translation_service_1 = require("../../../services/app-translation.service");
var account_service_1 = require("../../../services/account.service");
var utilities_1 = require("../../../services/utilities");
var role_edit_component_1 = require("../../controls/editors/role-edit/role-edit.component");
var RoleManagementComponent = /** @class */ (function () {
    function RoleManagementComponent(alertService, translationService, accountService) {
        this.alertService = alertService;
        this.translationService = translationService;
        this.accountService = accountService;
        this.columns = [];
        this.roles = [];
        this.rolesCache = [];
        this.allPermissions = [];
        this.selected = [];
    }
    RoleManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadData();
        var gT = function (key) { return _this.translationService.getTranslation(key); };
    };
    RoleManagementComponent.prototype.onAdd = function () {
        this.sourceRole = null;
        this.roleEdit.newRole();
    };
    RoleManagementComponent.prototype.onEdit = function () {
        this.sourceRole = this.selected[0];
        this.roleEdit.editRole(this.selected[0]);
    };
    RoleManagementComponent.prototype.onDelete = function () {
        if (this.selected.length > 0) {
            this.roleEdit.deleteRoles(this.selected);
        }
    };
    RoleManagementComponent.prototype.onExportAll = function () {
    };
    RoleManagementComponent.prototype.onExportSelected = function () {
    };
    RoleManagementComponent.prototype.updateList = function (returnRole) {
        if (this.sourceRole) {
            var index = this.roles.indexOf(this.sourceRole);
            var cacheIndex = this.rolesCache.indexOf(this.sourceRole);
            this.roles[index] = returnRole;
            this.rolesCache[cacheIndex] = returnRole;
            this.sourceRole = new role_model_1.Role();
        }
        else {
            this.roles.unshift(returnRole);
            this.rolesCache.unshift(returnRole);
        }
    };
    RoleManagementComponent.prototype.deleteList = function (rolestoDelete) {
        var _loop_1 = function (role) {
            this_1.roles = this_1.roles.filter(function (obj) { return obj !== role; });
            this_1.rolesCache = this_1.rolesCache.filter(function (obj) { return obj !== role; });
        };
        var this_1 = this;
        for (var _i = 0, rolestoDelete_1 = rolestoDelete; _i < rolestoDelete_1.length; _i++) {
            var role = rolestoDelete_1[_i];
            _loop_1(role);
        }
    };
    RoleManagementComponent.prototype.loadData = function () {
        var _this = this;
        this.roles = [];
        this.rolesCache = [];
        this.alertService.startLoadingMessage();
        this.accountService.getRolesAndPermissions()
            .subscribe(function (results) {
            _this.alertService.stopLoadingMessage();
            var roles = results[0];
            var permissions = results[1];
            roles.forEach(function (role, index) {
                role.index = index + 1;
            });
            _this.rolesCache = roles.slice();
            _this.roles = roles;
            _this.allPermissions = permissions;
        }, function (error) {
            _this.alertService.stopLoadingMessage();
            _this.alertService.showStickyMessage('Load Error', "Unable to retrieve roles from the server.\r\nErrors: \"" + utilities_1.Utilities.getHttpResponseMessage(error) + "\"", alert_service_1.MessageSeverity.error, error);
        });
    };
    RoleManagementComponent.prototype.onSearchChanged = function (value) {
        this.roles = this.rolesCache.filter(function (r) { return utilities_1.Utilities.searchArray(value, false, r.name, r.description); });
    };
    Object.defineProperty(RoleManagementComponent.prototype, "canManageRoles", {
        get: function () {
            return this.accountService.userHasPermission(permission_model_1.Permission.manageRolesPermission);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild(role_edit_component_1.RoleEditComponent),
        __metadata("design:type", Object)
    ], RoleManagementComponent.prototype, "roleEdit", void 0);
    RoleManagementComponent = __decorate([
        core_1.Component({
            selector: 'app-role-management',
            templateUrl: './role-management.component.html',
            styleUrls: ['./role-management.component.css']
        }),
        __metadata("design:paramtypes", [alert_service_1.AlertService, app_translation_service_1.AppTranslationService,
            account_service_1.AccountService])
    ], RoleManagementComponent);
    return RoleManagementComponent;
}());
exports.RoleManagementComponent = RoleManagementComponent;
//# sourceMappingURL=role-management.component.js.map