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
var forms_1 = require("@angular/forms");
var account_service_1 = require("../../../services/account.service");
var angular_1 = require("@clr/angular");
var user_edit_model_1 = require("../../../models/user-edit.model");
var permission_model_1 = require("../../../models/permission.model");
var operators_1 = require("rxjs/operators");
var UserEditComponent = /** @class */ (function () {
    function UserEditComponent(formBuilder, accountService) {
        this.formBuilder = formBuilder;
        this.accountService = accountService;
        this.submitBtnState = angular_1.ClrLoadingState.DEFAULT;
        this.canChangePassword = true;
        this.isNewUser = false;
        this.isCurrentPassowrd = false;
        this.isConfirmPassword = false;
        this.openModal = false;
        this.initialUser = new user_model_1.User();
        this.allRoles = [];
        this.shouldUpdateData = new core_1.EventEmitter();
    }
    UserEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("init user-edit");
        this.userForm = this.formBuilder.group({
            'userName': ['', forms_1.Validators.required],
            'jobTitle': [''],
            'fullName': ['', forms_1.Validators.required],
            'email': ['', [forms_1.Validators.required, forms_1.Validators.email]],
            'phoneNumber': ['', forms_1.Validators.required],
            'roles': [{ value: [], disabled: !this.canAssignRoles }, forms_1.Validators.required]
        });
        if (this.canViewAllRoles) {
            this.accountService.getRoles().subscribe(function (roles) { return _this.allRoles = roles; });
        }
    };
    UserEditComponent.prototype.loadUser = function (guid) {
        var _this = this;
        console.log(this.action);
        if (this.action == "Create") {
            this.addPassword();
            console.log("in create");
        }
        else {
            console.log("in edit");
            this.obsUser = this.accountService.getUser(guid).pipe(operators_1.tap(function (user) { return _this.userForm.patchValue(user); }));
            this.accountService.getUser(guid).subscribe(function (user) { return _this.initialUser = user; });
            console.log(this.initialUser);
            this.userId = guid;
        }
    };
    UserEditComponent.prototype.createUser = function () {
        var _this = this;
        console.log("In CreateUser");
        if (this.userForm.valid) {
            this.userEdit = new user_edit_model_1.UserEdit();
            Object.assign(this.userEdit, this.userForm.value);
            this.userEdit.isEnabled = true;
            this.accountService.newUser(this.userEdit).subscribe(function (response) { return _this.saveSuccessHelper(); }, function (error) { return _this.saveFailedHelper(error); });
        }
        else
            this.submitBtnState = angular_1.ClrLoadingState.ERROR;
    };
    UserEditComponent.prototype.updateUser = function () {
        var _this = this;
        console.log("in UpdateUser");
        if (this.userForm.valid) {
            this.userEdit = new user_edit_model_1.UserEdit();
            Object.assign(this.userEdit, this.userForm.value);
            this.userEdit.isEnabled = true;
            this.userEdit.userName = this.initialUser.userName;
            this.accountService.updateUser(this.userEdit).subscribe(function (response) { return _this.saveSuccessHelper(); }, function (error) { return _this.saveFailedHelper(error); });
        }
        else
            this.submitBtnState = angular_1.ClrLoadingState.ERROR;
    };
    UserEditComponent.prototype.saveSuccessHelper = function () {
        this.userForm.reset();
        this.submitBtnState = angular_1.ClrLoadingState.SUCCESS;
        this.isCurrentPassowrd = false;
        this.isConfirmPassword = false;
        this.deletePasswordFromUser(this.userEdit);
        this.refreshLoggedInUser();
        this.openModal = false;
        this.shouldUpdateData.emit();
    };
    UserEditComponent.prototype.saveFailedHelper = function (error) {
        this.submitBtnState = angular_1.ClrLoadingState.ERROR;
        console.log(error);
    };
    UserEditComponent.prototype.deletePasswordFromUser = function (user) {
        var userEdit = user;
        delete userEdit.currentPassword;
        delete userEdit.newPassword;
        delete userEdit.confirmPassword;
    };
    UserEditComponent.prototype.refreshLoggedInUser = function () {
        this.accountService.refreshLoggedInUser().subscribe();
    };
    UserEditComponent.prototype.addNewPassword = function () {
        this.userForm.addControl('newPassword', new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]));
        this.userForm.addControl('confirmPassword', new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]));
        this.isConfirmPassword = true;
    };
    UserEditComponent.prototype.removeNewPassword = function () {
        this.userForm.addControl('newPassword', new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]));
        this.userForm.addControl('confirmPassword', new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]));
        this.isConfirmPassword = true;
    };
    UserEditComponent.prototype.changePassword = function () {
        this.userForm.addControl('currentPassword', new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]));
        this.userForm.addControl('newPassword', new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]));
        this.userForm.addControl('confirmPassword', new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]));
        this.isCurrentPassowrd = true;
        this.isConfirmPassword = true;
    };
    UserEditComponent.prototype.openChange = function (value) {
        if (value) {
            this.openModal = true;
        }
        else {
            this.userForm.reset();
            this.openModal = false;
        }
    };
    Object.defineProperty(UserEditComponent.prototype, "canViewAllRoles", {
        get: function () {
            return this.accountService.userHasPermission(permission_model_1.Permission.viewRolesPermission);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserEditComponent.prototype, "canAssignRoles", {
        get: function () {
            return this.accountService.userHasPermission(permission_model_1.Permission.assignRolesPermission);
        },
        enumerable: true,
        configurable: true
    });
    UserEditComponent.prototype.resetForm = function () {
        this.userForm.reset();
    };
    UserEditComponent.prototype.save = function () {
        var _this = this;
        this.submitBtnState = angular_1.ClrLoadingState.LOADING;
        if (this.isNewUser) {
            this.accountService.newUser(this.userEdit).subscribe(function (user) { return _this.saveSuccessHelper(); }, function (error) { return _this.saveFailedHelper(error); });
        }
        else {
            this.accountService.updateUser(this.userEdit).subscribe(function (response) { return _this.saveSuccessHelper(); }, function (error) { return _this.saveFailedHelper(error); });
        }
    };
    UserEditComponent.prototype.newUser = function () {
        this.openModal = true;
        this.isNewUser = true;
        this.userEdit = new user_edit_model_1.UserEdit();
        this.userEdit.isEnabled = true;
        return this.userEdit;
    };
    UserEditComponent.prototype.editUser = function (user) {
        this.openModal = true;
        this.canChangePassword = true;
        if (user) {
            this.userForm.controls['userName'].disable();
            this.isNewUser = false;
            this.userForm.patchValue(user);
            this.userEdit = new user_edit_model_1.UserEdit();
            Object.assign(this.userEdit, user);
            return this.userEdit;
        }
        else {
            return this.newUser();
        }
    };
    UserEditComponent.prototype.viewUser = function (user) {
        this.userForm.patchValue(user);
        this.canChangePassword = false;
        this.userForm.patchValue(user);
        this.userForm.controls['userName'].disable();
        this.userForm.controls['jobTitle'].disable();
        this.userForm.controls['fullName'].disable();
        this.userForm.controls['email'].disable();
        this.userForm.controls['phoneNumber'].disable();
        this.userForm.controls['roles'].disable();
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], UserEditComponent.prototype, "shouldUpdateData", void 0);
    UserEditComponent = __decorate([
        core_1.Component({
            selector: 'app-user-edit',
            templateUrl: './user-edit.component.html',
            styleUrls: ['./user-edit.component.css']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, account_service_1.AccountService])
    ], UserEditComponent);
    return UserEditComponent;
}());
exports.UserEditComponent = UserEditComponent;
//# sourceMappingURL=user-edit.component.js.map