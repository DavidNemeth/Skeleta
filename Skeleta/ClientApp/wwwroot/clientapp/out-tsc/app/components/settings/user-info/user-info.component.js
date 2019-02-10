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
var utilities_1 = require("../../../services/utilities");
var permission_model_1 = require("../../../models/permission.model");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var user_edit_model_1 = require("../../../models/user-edit.model");
var angular_1 = require("@clr/angular");
var UserInfoComponent = /** @class */ (function () {
    function UserInfoComponent(formBuilder, alertService, accountService) {
        this.formBuilder = formBuilder;
        this.alertService = alertService;
        this.accountService = accountService;
        this.submitBtnState = angular_1.ClrLoadingState.DEFAULT;
        this.isEditMode = false;
        this.isNewUser = false;
        this.isSaving = false;
        this.isChangePassword = false;
        this.isEditingSelf = false;
        this.uniqueId = utilities_1.Utilities.uniqueId();
        this.allRoles = [];
        this.formResetToggle = true;
        this.userInfo = new user_model_1.User();
        this.isGeneralEditor = false;
    }
    UserInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userInfo = this.accountService.currentUser;
        this.userForm = this.formBuilder.group({
            'jobTitle': [this.userInfo.jobTitle],
            'fullName': [this.userInfo.fullName, forms_1.Validators.required],
            'email': [this.userInfo.email, [forms_1.Validators.required, forms_1.Validators.email]],
            'phoneNumber': [this.userInfo.phoneNumber, forms_1.Validators.required],
            'roles': [{ value: this.userInfo.roles, disabled: !this.canAssignRoles }, forms_1.Validators.required]
        });
        this.accountService.getRoles().subscribe(function (roles) { return _this.allRoles = roles; });
    };
    UserInfoComponent.prototype.editUser = function () {
        var _this = this;
        this.isEditMode = true;
        this.user = this.accountService.getUser().pipe(operators_1.tap(function (user) { return _this.userForm.patchValue(user); }));
    };
    UserInfoComponent.prototype.save = function () {
        var _this = this;
        this.submitBtnState = angular_1.ClrLoadingState.LOADING;
        if (this.userForm.valid) {
            this.userEdit = new user_edit_model_1.UserEdit();
            Object.assign(this.userEdit, this.userForm.value);
            this.userEdit.isEnabled = true;
            this.userEdit.id = this.userInfo.id;
            this.userEdit.userName = this.userInfo.userName;
            this.accountService.updateUser(this.userEdit).subscribe(function (response) { return _this.saveSuccessHelper(); }, function (error) { return _this.saveFailedHelper(error); });
        }
        else
            this.submitBtnState = angular_1.ClrLoadingState.ERROR;
    };
    UserInfoComponent.prototype.cancel = function () {
        this.isEditMode = false;
        this.isChangePassword = false;
        this.userForm.reset();
        this.userForm.removeControl('currentPassword');
        this.userForm.removeControl('newPassword');
        this.userForm.removeControl('confirmPassword');
        this.userForm.patchValue(this.userInfo);
    };
    UserInfoComponent.prototype.changePassword = function () {
        this.userForm.addControl('currentPassword', new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]));
        this.userForm.addControl('newPassword', new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]));
        this.userForm.addControl('confirmPassword', new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]));
        this.isChangePassword = true;
    };
    UserInfoComponent.prototype.saveFailedHelper = function (error) {
        this.submitBtnState = angular_1.ClrLoadingState.ERROR;
    };
    UserInfoComponent.prototype.saveSuccessHelper = function () {
        this.submitBtnState = angular_1.ClrLoadingState.SUCCESS;
        this.isEditMode = false;
        this.isChangePassword = false;
        Object.assign(this.userInfo, this.userEdit);
        this.accountService.refreshLoggedInUser().subscribe();
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