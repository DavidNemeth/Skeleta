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
var enum_1 = require("../../../../models/enum");
var bugItem_model_1 = require("../../../../services/bugItems/bugItem.model");
var forms_1 = require("@angular/forms");
var angular_1 = require("@clr/angular");
var app_translation_service_1 = require("../../../../services/app-translation.service");
var alert_service_1 = require("../../../../services/alert.service");
var bugitemService_1 = require("../../../../services/bugItems/bugitemService");
var account_service_1 = require("../../../../services/account.service");
var taskService_1 = require("../../../../services/tasks/taskService");
var BugitemEditComponent = /** @class */ (function () {
    function BugitemEditComponent(translationService, taskService, alertService, formBuilder, bugService, accountService) {
        var _this = this;
        this.translationService = translationService;
        this.taskService = taskService;
        this.alertService = alertService;
        this.formBuilder = formBuilder;
        this.bugService = bugService;
        this.accountService = accountService;
        this.submitBtnState = angular_1.ClrLoadingState.DEFAULT;
        this.deleteBtnState = angular_1.ClrLoadingState.DEFAULT;
        this.gT = function (key) { return _this.translationService.getTranslation(key); };
        this.actionTitle = "";
        this.deleteOpen = false;
        this.isNewItem = false;
        this.allStatus = Object.keys(enum_1.Status).slice();
        this.initialItem = new bugItem_model_1.BugItem();
        this.users = [];
        this.tasks = [];
        this.popData = new core_1.EventEmitter();
        this.updateData = new core_1.EventEmitter();
        this.updateStatus = new core_1.EventEmitter();
        this.openClose = new core_1.EventEmitter();
    }
    BugitemEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accountService.getUsers().subscribe(function (users) { return _this.users = users; });
        this.taskService.GetPendingTask().subscribe(function (tasks) { return _this.tasks = tasks; });
        this.currentUser = this.accountService.currentUser;
        this.loadForm();
    };
    BugitemEditComponent.prototype.loadForm = function () {
        this.bugForm = this.formBuilder.group({
            title: ['', forms_1.Validators.required],
            description: [''],
            status: ['New', forms_1.Validators.required],
            developerId: [this.currentUser.id],
            testerId: [this.currentUser.id],
            taskItemId: ['']
        });
    };
    BugitemEditComponent.prototype.close = function () {
        this.isOpen = false;
        this.openClose.emit();
        this.isNewItem = false;
        this.loadForm();
        this.alertService.resetStickyMessage();
    };
    BugitemEditComponent.prototype.save = function () {
        var _this = this;
        this.submitBtnState = angular_1.ClrLoadingState.LOADING;
        Object.assign(this.itemEdit, this.bugForm.value);
        if (this.isNewItem) {
            this.bugService.NewItem(this.itemEdit).subscribe(function (bug) { return _this.saveSuccessHelper(); }, function (error) { return _this.saveFailedHelper(error); });
        }
        else {
            this.bugService.UpdateItem(this.itemEdit).subscribe(function (response) { return _this.saveSuccessHelper(); }, function (error) { return _this.saveFailedHelper(error); });
        }
    };
    BugitemEditComponent.prototype.saveSuccessHelper = function () {
        Object.assign(this.initialItem, this.itemEdit);
        this.updateData.emit(this.initialItem);
        if (this.isNewItem)
            this.alertService.showMessage(this.gT('toasts.saved'), "Bug added!", alert_service_1.MessageSeverity.success);
        else
            this.alertService.showMessage(this.gT('toasts.saved'), "Bug modified!", alert_service_1.MessageSeverity.success);
        this.submitBtnState = angular_1.ClrLoadingState.SUCCESS;
        this.close();
    };
    BugitemEditComponent.prototype.saveFailedHelper = function (error) {
        this.submitBtnState = angular_1.ClrLoadingState.ERROR;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage(error, null, alert_service_1.MessageSeverity.error);
    };
    BugitemEditComponent.prototype.resetForm = function () {
        this.loadForm();
        this.alertService.resetStickyMessage();
        if (!this.isNewItem) {
            this.bugForm.patchValue(this.initialItem);
        }
    };
    BugitemEditComponent.prototype.Create = function () {
        this.submitBtnState = angular_1.ClrLoadingState.DEFAULT;
        this.isNewItem = true;
        this.actionTitle = "Add";
        this.initialItem = new bugItem_model_1.BugItem();
        this.itemEdit = new bugItem_model_1.BugItem();
    };
    BugitemEditComponent.prototype.Edit = function (itemid) {
        var _this = this;
        if (itemid) {
            this.bugService.GetItem(itemid).subscribe(function (response) {
                _this.initialItem = new bugItem_model_1.BugItem();
                Object.assign(_this.initialItem, response);
                _this.itemEdit = new bugItem_model_1.BugItem;
                Object.assign(_this.itemEdit, response);
                _this.submitBtnState = angular_1.ClrLoadingState.DEFAULT;
                _this.isNewItem = false;
                _this.actionTitle = "Edit";
                _this.bugForm.patchValue(_this.itemEdit);
            }, function (error) {
                return _this.Create();
            });
        }
        else {
            this.Create();
        }
    };
    BugitemEditComponent.prototype.MarkActive = function (item) {
        var _this = this;
        if (item) {
            this.bugService.GetItem(item.id).subscribe(function (editItem) {
                item.status = enum_1.Status.Active;
                _this.bugService.UpdateItem(editItem).subscribe(function (response) {
                    _this.alertService.showMessage(_this.gT('toasts.saved'), "Bug is now Active!", alert_service_1.MessageSeverity.success);
                    Object.assign(item, editItem);
                    _this.updateStatus.emit(item);
                }, function (error) { return _this.alertService.showMessage(error, null, alert_service_1.MessageSeverity.error); });
            }, function (error) { return _this.alertService.showMessage(error, null, alert_service_1.MessageSeverity.error); });
        }
    };
    BugitemEditComponent.prototype.MarkResolved = function (item) {
        var _this = this;
        if (item) {
            this.bugService.GetItem(item.id).subscribe(function (editItem) {
                item.status = enum_1.Status.Resolved;
                _this.bugService.UpdateItem(editItem).subscribe(function (response) {
                    _this.alertService.showMessage(_this.gT('toasts.saved'), "Bug is now Active!", alert_service_1.MessageSeverity.success);
                    Object.assign(item, editItem);
                    _this.updateStatus.emit(item);
                }, function (error) { return _this.alertService.showMessage(error, null, alert_service_1.MessageSeverity.error); });
            }, function (error) { return _this.alertService.showMessage(error, null, alert_service_1.MessageSeverity.error); });
        }
    };
    BugitemEditComponent.prototype.MarkClosed = function (item) {
        var _this = this;
        if (item) {
            this.bugService.GetItem(item.id).subscribe(function (editItem) {
                item.status = enum_1.Status.Closed;
                _this.bugService.UpdateItem(editItem).subscribe(function (response) {
                    _this.alertService.showMessage(_this.gT('toasts.saved'), "Bug is now Active!", alert_service_1.MessageSeverity.success);
                    Object.assign(item, editItem);
                    _this.updateStatus.emit(item);
                }, function (error) { return _this.alertService.showMessage(error, null, alert_service_1.MessageSeverity.error); });
            }, function (error) { return _this.alertService.showMessage(error, null, alert_service_1.MessageSeverity.error); });
        }
    };
    __decorate([
        core_1.ViewChild(angular_1.ClrForm),
        __metadata("design:type", Object)
    ], BugitemEditComponent.prototype, "clrForm", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], BugitemEditComponent.prototype, "isOpen", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BugitemEditComponent.prototype, "popData", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BugitemEditComponent.prototype, "updateData", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BugitemEditComponent.prototype, "updateStatus", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BugitemEditComponent.prototype, "openClose", void 0);
    BugitemEditComponent = __decorate([
        core_1.Component({
            selector: 'app-bugitem-edit',
            templateUrl: './bugitem-edit.component.html',
            styleUrls: ['./bugitem-edit.component.css']
        }),
        __metadata("design:paramtypes", [app_translation_service_1.AppTranslationService, taskService_1.TaskService,
            alert_service_1.AlertService, forms_1.FormBuilder,
            bugitemService_1.BugItemService, account_service_1.AccountService])
    ], BugitemEditComponent);
    return BugitemEditComponent;
}());
exports.BugitemEditComponent = BugitemEditComponent;
//# sourceMappingURL=bugitem-edit.component.js.map