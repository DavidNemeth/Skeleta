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
var animations_1 = require("../../services/animations");
var account_service_1 = require("../../services/account.service");
var permission_model_1 = require("../../models/permission.model");
var angular_1 = require("@clr/angular");
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(route, accountService) {
        this.route = route;
        this.accountService = accountService;
        this.isProfileActivated = true;
        this.isPreferencesActivated = false;
        this.isUsersActivated = false;
        this.isRolesActivated = false;
        this.profileTab = 'profile';
        this.preferencesTab = 'preferences';
        this.usersTab = 'users';
        this.rolesTab = 'roles';
        this.managementActive = false;
        this.cloudActive = false;
        this.infrastructureActive = false;
        this.tabsVertical = true;
        this.flexboxifiedContent = false;
    }
    SettingsComponent.prototype.getTabIndex = function () {
        var tabIndex = this.tabs.tabLinkDirectives.toArray().findIndex(function (x) { return x.active; });
        alert('tabIndex = ' + tabIndex);
    };
    SettingsComponent.prototype.ngOnInit = function () {
        this.additionalTabHeads = [];
    };
    SettingsComponent.prototype.arrPush = function (arr) {
        arr.push(arr[arr.length - 1]);
    };
    SettingsComponent.prototype.arrPop = function (arr) {
        arr.pop();
    };
    SettingsComponent.prototype.ngOnDestroy = function () {
    };
    Object.defineProperty(SettingsComponent.prototype, "canViewUsers", {
        get: function () {
            return this.accountService.userHasPermission(permission_model_1.Permission.viewUsersPermission);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SettingsComponent.prototype, "canViewRoles", {
        get: function () {
            return this.accountService.userHasPermission(permission_model_1.Permission.viewRolesPermission);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SettingsComponent.prototype, "class", void 0);
    __decorate([
        core_1.ViewChild(angular_1.ClrTabs),
        __metadata("design:type", angular_1.ClrTabs)
    ], SettingsComponent.prototype, "tabs", void 0);
    SettingsComponent = __decorate([
        core_1.Component({
            selector: 'app-settings',
            templateUrl: './settings.component.html',
            styleUrls: ['./settings.component.css'],
            animations: [animations_1.fadeInOut]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, account_service_1.AccountService])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=settings.component.js.map