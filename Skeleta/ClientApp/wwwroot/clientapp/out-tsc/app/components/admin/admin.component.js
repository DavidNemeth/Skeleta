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
var AdminComponent = /** @class */ (function () {
    function AdminComponent(route, accountService) {
        this.route = route;
        this.accountService = accountService;
        this.showContainerClass = true;
    }
    AdminComponent.prototype.getTabIndex = function () {
    };
    AdminComponent.prototype.ngOnInit = function () {
    };
    AdminComponent.prototype.arrPush = function (arr) {
        arr.push(arr[arr.length - 1]);
    };
    AdminComponent.prototype.arrPop = function (arr) {
        arr.pop();
    };
    AdminComponent.prototype.ngOnDestroy = function () {
    };
    Object.defineProperty(AdminComponent.prototype, "canViewUsers", {
        get: function () {
            return this.accountService.userHasPermission(permission_model_1.Permission.viewUsersPermission);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdminComponent.prototype, "canViewRoles", {
        get: function () {
            return this.accountService.userHasPermission(permission_model_1.Permission.viewRolesPermission);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.HostBinding('class.content-container'),
        __metadata("design:type", Object)
    ], AdminComponent.prototype, "showContainerClass", void 0);
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'app-admin',
            templateUrl: './admin.component.html',
            styleUrls: ['./admin.component.css'],
            animations: [animations_1.fadeInOutRoute, animations_1.fadeInOut]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, account_service_1.AccountService])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map