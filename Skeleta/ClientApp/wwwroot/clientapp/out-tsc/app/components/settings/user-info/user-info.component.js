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
var account_service_1 = require("../../../services/account.service");
var alert_service_1 = require("../../../services/alert.service");
var utilities_1 = require("../../../services/utilities");
var permission_model_1 = require("../../../models/permission.model");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var user_edit_model_1 = require("../../../models/user-edit.model");
var UserInfoComponent = /** @class */ (function () {
    function UserInfoComponent(formBuilder, alertService, accountService) {
        this.formBuilder = formBuilder;
        this.alertService = alertService;
        this.accountService = accountService;
        this.isEditMode = false;
        this.isNewUser = false;
        this.isSaving = false;
        this.isChangePassword = false;
        this.isEditingSelf = false;
        this.uniqueId = utilities_1.Utilities.uniqueId();
        this.allRoles = [];
        this.formResetToggle = true;
        this.isGeneralEditor = false;
    }
    UserInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userForm = this.formBuilder.group({
            'jobTitle': ['', forms_1.Validators.required],
            'userName': [{ value: '', disabled: true }, forms_1.Validators.required],
            'fullName': ['', forms_1.Validators.required],
            'email': ['', [forms_1.Validators.required, forms_1.Validators.email]],
            'phoneNumber': ['', forms_1.Validators.required],
            'roles': [{ value: '', disabled: true }, forms_1.Validators.required]
        });
        this.user = this.accountService.getUser().pipe(operators_1.tap(function (user) { return _this.userForm.patchValue(user); }));
        this.accountService.getRoles().subscribe(function (roles) { return _this.allRoles = roles; });
    };
    UserInfoComponent.prototype.resetForm = function () {
        var _this = this;
        this.userForm.reset();
        this.user = this.accountService.getUser().pipe(operators_1.tap(function (user) { return _this.userForm.patchValue(user); }));
    };
    UserInfoComponent.prototype.save = function () {
        if (this.userForm.valid) {
            this.userEdit = new user_edit_model_1.UserEdit();
            Object.assign(this.userEdit, this.userForm.value);
            this.accountService.updateUser(this.userEdit).subscribe();
        }
    };
    UserInfoComponent.prototype.getRoleByName = function (name) {
        return this.allRoles.find(function (r) { return r.name == name; });
    };
    Object.defineProperty(UserInfoComponent.prototype, "canViewAllRoles", {
        get: function () {
            return this.accountService.userHasPermission(permission_model_1.Permission.viewRolesPermission);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfoComponent.prototype, "canAssignRoles", {
        get: function () {
            return this.accountService.userHasPermission(permission_model_1.Permission.assignRolesPermission);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], UserInfoComponent.prototype, "isViewOnly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], UserInfoComponent.prototype, "isGeneralEditor", void 0);
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