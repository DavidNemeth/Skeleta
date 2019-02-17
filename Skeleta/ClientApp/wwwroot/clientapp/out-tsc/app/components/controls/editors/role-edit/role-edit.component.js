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
var role_model_1 = require("../../../../models/role.model");
var account_service_1 = require("../../../../services/account.service");
var permission_model_1 = require("../../../../models/permission.model");
var forms_1 = require("@angular/forms");
var angular_1 = require("@clr/angular");
var RoleEditComponent = /** @class */ (function () {
    function RoleEditComponent(formBuilder, accountService) {
        this.formBuilder = formBuilder;
        this.accountService = accountService;
        this.submitBtnState = angular_1.ClrLoadingState.DEFAULT;
        this.deleteBtnState = angular_1.ClrLoadingState.DEFAULT;
        this.deleteOpen = false;
        this.openModal = false;
        this.isNewRole = false;
        this.roleEdit = new role_model_1.Role();
        this.rolesToDelete = [];
        this.allPermissions = [];
        this.initialPremissions = [];
        this.shouldUpdateData = new core_1.EventEmitter();
    }
    RoleEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accountService.getPermissions().subscribe(function (premissions) { return _this.allPermissions = premissions; });
        var permissions = [];
        this.roleForm = this.formBuilder.group({
            'name': ['', forms_1.Validators.required],
            'description': [''],
            'permissions': []
        });
    };
    RoleEditComponent.prototype.openChange = function (value) {
        if (value) {
        }
        else {
            var permissions = [];
            this.isNewRole = false;
            this.openModal = false;
            this.initialPremissions = [];
            this.roleForm = this.formBuilder.group({
                'name': ['', forms_1.Validators.required],
                'description': [''],
                'permissions': []
            });
        }
    };
    RoleEditComponent.prototype.save = function () {
        var _this = this;
        this.submitBtnState = angular_1.ClrLoadingState.LOADING;
        Object.assign(this.roleEdit, this.roleForm.value);
        if (this.isNewRole) {
            this.accountService.newRole(this.roleEdit)
                .subscribe(function (role) { return _this.saveSuccessHelper(role); }, function (error) { return _this.saveFailedHelper(error); });
        }
        else {
            this.accountService.updateRole(this.roleEdit)
                .subscribe(function (response) { return _this.saveSuccessHelper(); }, function (error) { return _this.saveFailedHelper(error); });
        }
    };
    RoleEditComponent.prototype.saveSuccessHelper = function (role) {
        this.shouldUpdateData.emit();
        this.roleEdit = new role_model_1.Role();
        this.submitBtnState = angular_1.ClrLoadingState.SUCCESS;
        this.openModal = false;
    };
    RoleEditComponent.prototype.saveFailedHelper = function (error) {
        this.submitBtnState = angular_1.ClrLoadingState.ERROR;
        console.log(error);
    };
    RoleEditComponent.prototype.newRole = function () {
        this.openModal = true;
        this.isNewRole = true;
        this.roleEdit = new role_model_1.Role();
        this.initialPremissions = [];
        return this.roleEdit;
    };
    RoleEditComponent.prototype.editRole = function (role) {
        if (role_model_1.Role) {
            var premissions = [];
            for (var _i = 0, _a = role.permissions; _i < _a.length; _i++) {
                var premission = _a[_i];
                premissions.push(premission);
            }
            this.openModal = true;
            this.isNewRole = false;
            this.roleForm.patchValue(role);
            this.roleEdit = new role_model_1.Role();
            Object.assign(this.roleEdit, role);
            Object.assign(this.initialPremissions, role.permissions);
            return this.roleEdit;
        }
        else {
            return this.newRole();
        }
    };
    RoleEditComponent.prototype.deleteRoles = function (roles) {
        this.deleteOpen = true;
        this.rolesToDelete = roles;
    };
    RoleEditComponent.prototype.Delete = function () {
        var _this = this;
        this.deleteBtnState = angular_1.ClrLoadingState.LOADING;
        var roleCount = this.rolesToDelete.length;
        var current = 0;
        for (var _i = 0, _a = this.rolesToDelete; _i < _a.length; _i++) {
            var role = _a[_i];
            this.accountService.deleteRole(role).subscribe(function (result) {
                current++;
                if (current === roleCount) {
                    _this.shouldUpdateData.emit();
                    _this.deleteOpen = false;
                    _this.deleteBtnState = angular_1.ClrLoadingState.SUCCESS;
                }
            });
        }
    };
    Object.defineProperty(RoleEditComponent.prototype, "canManageRoles", {
        get: function () {
            return this.accountService.userHasPermission(permission_model_1.Permission.manageRolesPermission);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], RoleEditComponent.prototype, "shouldUpdateData", void 0);
    RoleEditComponent = __decorate([
        core_1.Component({
            selector: 'app-role-edit',
            templateUrl: './role-edit.component.html',
            styleUrls: ['./role-edit.component.css']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, account_service_1.AccountService])
    ], RoleEditComponent);
    return RoleEditComponent;
}());
exports.RoleEditComponent = RoleEditComponent;
//# sourceMappingURL=role-edit.component.js.map