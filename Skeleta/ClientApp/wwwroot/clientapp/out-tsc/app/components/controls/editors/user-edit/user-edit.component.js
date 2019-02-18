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
var user_model_1 = require("../../../../models/user.model");
var forms_1 = require("@angular/forms");
var account_service_1 = require("../../../../services/account.service");
var angular_1 = require("@clr/angular");
var user_edit_model_1 = require("../../../../models/user-edit.model");
var permission_model_1 = require("../../../../models/permission.model");
var must_match_validator_1 = require("../../../../helpers/must-match.validator");
var UserEditComponent = /** @class */ (function () {
    function UserEditComponent(formBuilder, accountService) {
        this.formBuilder = formBuilder;
        this.accountService = accountService;
        this.submitBtnState = angular_1.ClrLoadingState.DEFAULT;
        this.deleteBtnState = angular_1.ClrLoadingState.DEFAULT;
        this.deleteOpen = false;
        this.canChangePassword = false;
        this.isNewUser = false;
        this.isCurrentPassowrd = false;
        this.isConfirmPassword = false;
        this.openModal = false;
        this.initialUser = new user_model_1.User();
        this.allRoles = [];
        this.usersToDelete = [];
        this.updateData = new core_1.EventEmitter();
    }
    UserEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userForm = this.formBuilder.group({
            userName: ['', forms_1.Validators.required],
            jobTitle: [''],
            fullName: ['', forms_1.Validators.required],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            phoneNumber: ['', forms_1.Validators.required],
            roles: [{ value: [], disabled: !this.canAssignRoles }, forms_1.Validators.required],
            currentPassword: [{ value: '', disabled: true }, [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
            newPassword: [{ value: '', disabled: true }, [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
            confirmPassword: [{ value: '', disabled: true }, [forms_1.Validators.required, forms_1.Validators.minLength(6)]]
        }, {
            validator: must_match_validator_1.MustMatch('newPassword', 'confirmPassword')
        });
        if (this.canViewAllRoles) {
            this.accountService.getRoles().subscribe(function (roles) { return _this.allRoles = roles; });
        }
    };
    UserEditComponent.prototype.openChange = function (value) {
        if (value) {
        }
        else {
            this.canChangePassword = false;
            this.isNewUser = false;
            this.openModal = false;
            this.deletePasswordFromUser(this.userEdit);
            this.deletePasswordFromUser(this.initialUser);
            this.userForm = this.formBuilder.group({
                userName: ['', forms_1.Validators.required],
                jobTitle: [''],
                fullName: ['', forms_1.Validators.required],
                email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
                phoneNumber: ['', forms_1.Validators.required],
                roles: [{ value: [], disabled: !this.canAssignRoles }, forms_1.Validators.required],
                currentPassword: [{ value: '', disabled: true }, [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
                newPassword: [{ value: '', disabled: true }, [forms_1.Validators.required, forms_1.Validators.minLength(6)]],
                confirmPassword: [{ value: '', disabled: true }, [forms_1.Validators.required, forms_1.Validators.minLength(6)]]
            }, {
                validator: must_match_validator_1.MustMatch('newPassword', 'confirmPassword')
            });
            this.removeChangePassword();
        }
    };
    UserEditComponent.prototype.save = function () {
        var _this = this;
        for (var i in this.userForm.controls)
            this.userForm.controls[i].markAsTouched();
        this.submitBtnState = angular_1.ClrLoadingState.LOADING;
        Object.assign(this.userEdit, this.userForm.value);
        if (this.isNewUser) {
            this.accountService.newUser(this.userEdit).subscribe(function (user) { return _this.saveSuccessHelper(); }, function (error) { return _this.saveFailedHelper(error); });
        }
        else {
            this.accountService.updateUser(this.userEdit).subscribe(function (response) { return _this.saveSuccessHelper(); }, function (error) { return _this.saveFailedHelper(error); });
        }
    };
    UserEditComponent.prototype.saveSuccessHelper = function () {
        this.accountService.refreshLoggedInUser().subscribe();
        this.shouldUpdateData.emit();
        this.submitBtnState = angular_1.ClrLoadingState.SUCCESS;
        this.openModal = false;
    };
    UserEditComponent.prototype.saveFailedHelper = function (error) {
        this.submitBtnState = angular_1.ClrLoadingState.ERROR;
        console.log(error);
    };
    UserEditComponent.prototype.addNewPassword = function () {
        this.userForm.controls['newPassword'].enable();
        this.userForm.controls['confirmPassword'].enable();
        this.isConfirmPassword = true;
    };
    UserEditComponent.prototype.addChangePassword = function () {
        if (this.isCurrentPassowrd == true) {
            this.userForm.controls['currentPassword'].disable();
            this.userForm.controls['newPassword'].disable();
            this.userForm.controls['confirmPassword'].disable();
            this.isCurrentPassowrd = false;
            this.isConfirmPassword = false;
        }
        else {
            this.userForm.controls['currentPassword'].enable();
            this.userForm.controls['newPassword'].enable();
            this.userForm.controls['confirmPassword'].enable();
            this.isCurrentPassowrd = true;
            this.isConfirmPassword = true;
        }
    };
    UserEditComponent.prototype.removeChangePassword = function () {
        this.userForm.controls['currentPassword'].disable();
        this.userForm.controls['newPassword'].disable();
        this.userForm.controls['confirmPassword'].disable();
        this.isCurrentPassowrd = false;
        this.isConfirmPassword = false;
    };
    UserEditComponent.prototype.resetForm = function () {
        this.userForm.reset();
        this.userForm.patchValue(this.initialUser);
        if (!this.isNewUser)
            this.removeChangePassword();
    };
    UserEditComponent.prototype.deletePasswordFromUser = function (user) {
        var userEdit = user;
        delete userEdit.currentPassword;
        delete userEdit.newPassword;
        delete userEdit.confirmPassword;
    };
    UserEditComponent.prototype.newUser = function () {
        this.userForm.controls['userName'].enable();
        this.openModal = true;
        this.canChangePassword = false;
        this.isNewUser = true;
        this.initialUser = new user_model_1.User();
        this.userEdit = new user_edit_model_1.UserEdit();
        this.userEdit.isEnabled = true;
        this.addNewPassword();
        return this.userEdit;
    };
    UserEditComponent.prototype.editUser = function (user) {
        if (user) {
            this.openModal = true;
            this.canChangePassword = true;
            this.userForm.controls['userName'].disable();
            this.isNewUser = false;
            this.userForm.patchValue(user);
            this.initialUser = new user_model_1.User();
            Object.assign(this.initialUser, user);
            this.userEdit = new user_edit_model_1.UserEdit();
            Object.assign(this.userEdit, user);
            return this.userEdit;
        }
        else {
            return this.newUser();
        }
    };
    UserEditComponent.prototype.viewUser = function (user) {
        Object.assign(this.initialUser, user);
        this.userForm.patchValue(this.initialUser);
        this.canChangePassword = false;
        this.userForm.controls['userName'].disable();
        this.userForm.controls['jobTitle'].disable();
        this.userForm.controls['fullName'].disable();
        this.userForm.controls['email'].disable();
        this.userForm.controls['phoneNumber'].disable();
        this.userForm.controls['roles'].disable();
    };
    UserEditComponent.prototype.deleteUsers = function (users) {
        this.deleteOpen = true;
        this.usersToDelete = users;
    };
    UserEditComponent.prototype.Delete = function () {
        var _this = this;
        this.deleteBtnState = angular_1.ClrLoadingState.LOADING;
        var userCount = this.usersToDelete.length;
        var current = 0;
        for (var _i = 0, _a = this.usersToDelete; _i < _a.length; _i++) {
            var user = _a[_i];
            this.accountService.deleteUser(user).subscribe(function (result) {
                current++;
                if (current === userCount) {
                    _this.shouldUpdateData.emit();
                    _this.deleteOpen = false;
                    _this.deleteBtnState = angular_1.ClrLoadingState.SUCCESS;
                }
            });
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
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], UserEditComponent.prototype, "updateData", void 0);
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