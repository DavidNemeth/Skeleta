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
var user_model_1 = require("../../../models/user.model");
var account_service_1 = require("../../../services/account.service");
var alert_service_1 = require("../../../services/alert.service");
var forms_1 = require("@angular/forms");
var permission_model_1 = require("../../../models/permission.model");
var UserInfoComponent = /** @class */ (function () {
    function UserInfoComponent(formBuilder, alertService, accountService) {
        this.formBuilder = formBuilder;
        this.alertService = alertService;
        this.accountService = accountService;
        this.userInfo = new user_model_1.User();
        this.allRoles = [];
        this.openModal = false;
        this.isCreateUser = false;
        this.isEditingSelf = true;
        this.isViewOnly = false;
    }
    UserInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userInfo = this.accountService.currentUser;
        this.userid = this.accountService.currentUser.id;
        if (this.canViewAllRoles) {
            this.accountService.getRoles().subscribe(function (roles) { return _this.allRoles = roles; });
        }
    };
    UserInfoComponent.prototype.loadData = function () {
        var _this = this;
        this.accountService.getUser().subscribe(function (user) { return _this.userInfo = user; });
    };
    Object.defineProperty(UserInfoComponent.prototype, "canViewAllRoles", {
        get: function () {
            return this.accountService.userHasPermission(permission_model_1.Permission.viewRolesPermission);
        },
        enumerable: true,
        configurable: true
    });
    UserInfoComponent.prototype.editUser = function () {
        this.action = "Update";
        this.openModal = !this.openModal;
    };
    UserInfoComponent = __decorate([
        core_1.Component({
            selector: 'app-user-info',
            templateUrl: './user-info.component.html',
            styleUrls: ['./user-info.component.css']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, alert_service_1.AlertService, account_service_1.AccountService])
    ], UserInfoComponent);
    return UserInfoComponent;
}());
exports.UserInfoComponent = UserInfoComponent;
//# sourceMappingURL=user-info.component.js.map