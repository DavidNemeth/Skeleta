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
var bugItem_model_1 = require("../../../../services/bugItems/bugItem.model");
var forms_1 = require("@angular/forms");
var angular_1 = require("@clr/angular");
var app_translation_service_1 = require("../../../../services/app-translation.service");
var alert_service_1 = require("../../../../services/alert.service");
var bugitemService_1 = require("../../../../services/bugItems/bugitemService");
var account_service_1 = require("../../../../services/account.service");
var animations_1 = require("../../../../services/animations");
var BugitemEditComponent = /** @class */ (function () {
    function BugitemEditComponent(translationService, alertService, formBuilder, bugService, accountService) {
        var _this = this;
        this.translationService = translationService;
        this.alertService = alertService;
        this.formBuilder = formBuilder;
        this.bugService = bugService;
        this.accountService = accountService;
        this.submitBtnState = angular_1.ClrLoadingState.DEFAULT;
        this.deleteBtnState = angular_1.ClrLoadingState.DEFAULT;
        this.actionTitle = '';
        this.deleteOpen = false;
        this.isNewItem = false;
        this.allStatus = ['Active', 'Resolved', 'Completed'];
        this.dataLoaded = false;
        this.isOpen = false;
        this.initialItem = new bugItem_model_1.BugItem();
        this.users = [];
        this.popData = new core_1.EventEmitter();
        this.updateData = new core_1.EventEmitter();
        this.updateStatus = new core_1.EventEmitter();
        this.openClose = new core_1.EventEmitter();
        this.gT = function (key) { return _this.translationService.getTranslation(key); };
    }
    BugitemEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accountService.getActiveUsers().subscribe(function (users) { return _this.users = users; });
        this.currentUser = this.accountService.currentUser;
    };
    BugitemEditComponent.prototype.loadForm = function () {
        this.bugForm = this.formBuilder.group({
            title: ['', forms_1.Validators.required],
            description: [''],
            status: ['Active', forms_1.Validators.required],
            developerId: [this.devId],
            testerId: [this.testerId]
        });
        this.dataLoaded = true;
    };
    BugitemEditComponent.prototype.onOpen = function () {
        this.close();
    };
    BugitemEditComponent.prototype.close = function () {
        this.isOpen = false;
        this.dataLoaded = false;
        this.bugForm.reset();
        this.openClose.emit();
        this.isNewItem = false;
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
        if (this.isNewItem) {
            this.alertService.showMessage(this.gT('toasts.saved'), "Bug added!", alert_service_1.MessageSeverity.success);
        }
        else {
            this.alertService.showMessage(this.gT('toasts.saved'), "Bug modified!", alert_service_1.MessageSeverity.success);
        }
        this.submitBtnState = angular_1.ClrLoadingState.SUCCESS;
        this.close();
    };
    BugitemEditComponent.prototype.saveFailedHelper = function (error) {
        this.submitBtnState = angular_1.ClrLoadingState.ERROR;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage(error, null, alert_service_1.MessageSeverity.error);
    };
    BugitemEditComponent.prototype.Create = function (taskId, devId, testerId) {
        this.isOpen = true;
        this.submitBtnState = angular_1.ClrLoadingState.DEFAULT;
        this.isNewItem = true;
        this.actionTitle = 'Add';
        this.testerId = testerId;
        this.devId = devId;
        this.initialItem = new bugItem_model_1.BugItem();
        this.itemEdit = new bugItem_model_1.BugItem();
        this.itemEdit.taskItemId = taskId;
        this.loadForm();
    };
    BugitemEditComponent.prototype.Edit = function (itemid) {
        var _this = this;
        if (itemid) {
            this.isOpen = true;
            this.bugService.GetItem(itemid).subscribe(function (response) {
                _this.initialItem = new bugItem_model_1.BugItem();
                Object.assign(_this.initialItem, response);
                _this.itemEdit = new bugItem_model_1.BugItem;
                Object.assign(_this.itemEdit, response);
                _this.submitBtnState = angular_1.ClrLoadingState.DEFAULT;
                _this.isNewItem = false;
                _this.loadForm();
                _this.bugForm.patchValue(_this.itemEdit);
            }, function (error) { return _this.alertService.showMessage(error, null, alert_service_1.MessageSeverity.error); });
        }
        else {
            this.alertService.showMessage('error no item found', null, alert_service_1.MessageSeverity.error);
        }
    };
    __decorate([
        core_1.ViewChild(angular_1.ClrForm),
        __metadata("design:type", Object)
    ], BugitemEditComponent.prototype, "clrForm", void 0);
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
            styleUrls: ['./bugitem-edit.component.css'],
            animations: [animations_1.fadeInOut]
        }),
        __metadata("design:paramtypes", [app_translation_service_1.AppTranslationService,
            alert_service_1.AlertService, forms_1.FormBuilder,
            bugitemService_1.BugItemService, account_service_1.AccountService])
    ], BugitemEditComponent);
    return BugitemEditComponent;
}());
exports.BugitemEditComponent = BugitemEditComponent;
//# sourceMappingURL=bugitem-edit.component.js.map