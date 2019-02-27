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
var angular_1 = require("@clr/angular");
var app_translation_service_1 = require("../../../../services/app-translation.service");
var alert_service_1 = require("../../../../services/alert.service");
var forms_1 = require("@angular/forms");
var taskService_1 = require("../../../../services/tasks/taskService");
var task_model_1 = require("../../../../services/tasks/task.model");
var enum_1 = require("../../../../models/enum");
var account_service_1 = require("../../../../services/account.service");
var TaskEditComponent = /** @class */ (function () {
    function TaskEditComponent(translationService, alertService, formBuilder, taskService, accountService) {
        var _this = this;
        this.translationService = translationService;
        this.alertService = alertService;
        this.formBuilder = formBuilder;
        this.taskService = taskService;
        this.accountService = accountService;
        this.submitBtnState = angular_1.ClrLoadingState.DEFAULT;
        this.deleteBtnState = angular_1.ClrLoadingState.DEFAULT;
        this.gT = function (key) { return _this.translationService.getTranslation(key); };
        this.actionTitle = "";
        this.deleteOpen = false;
        this.isNewTask = false;
        this.allStatus = Object.keys(enum_1.Status).slice();
        this.allPriority = Object.keys(enum_1.Priority).slice();
        this.initialTask = new task_model_1.Task();
        this.tasksToDelete = [];
        this.users = [];
        this.updateData = new core_1.EventEmitter();
        this.deleteData = new core_1.EventEmitter();
    }
    TaskEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadForm();
        this.accountService.getUsers().subscribe(function (users) { return _this.users = users; });
    };
    TaskEditComponent.prototype.loadForm = function () {
        this.taskForm = this.formBuilder.group({
            title: ['', forms_1.Validators.required],
            description: [''],
            comment: [''],
            priority: ['High', forms_1.Validators.required],
            status: ['New', forms_1.Validators.required],
            assignedTo: ['admin', forms_1.Validators.required],
            assignedBy: ['admin', forms_1.Validators.required],
        });
    };
    TaskEditComponent.prototype.openChange = function (value) {
        if (value) {
        }
        else {
            this.isNewTask = false;
            this.openModal = false;
            this.loadForm();
            this.alertService.resetStickyMessage();
        }
    };
    TaskEditComponent.prototype.save = function () {
        var _this = this;
        for (var i in this.taskForm.controls)
            this.taskForm.controls[i].markAsTouched();
        this.submitBtnState = angular_1.ClrLoadingState.LOADING;
        Object.assign(this.taskEdit, this.taskForm.value);
        console.log(this.taskEdit);
        if (this.isNewTask) {
            this.taskService.NewTask(this.taskEdit).subscribe(function (task) { return _this.saveSuccessHelper(); }, function (error) { return _this.saveFailedHelper(error); });
        }
        else {
            this.taskService.UpdateTask(this.taskEdit).subscribe(function (response) { return _this.saveSuccessHelper(); }, function (error) { return _this.saveFailedHelper(error); });
        }
    };
    TaskEditComponent.prototype.saveSuccessHelper = function () {
        Object.assign(this.initialTask, this.taskEdit);
        this.updateData.emit(this.initialTask);
        if (this.isNewTask)
            this.alertService.showMessage(this.gT('toasts.saved'), "Task added!", alert_service_1.MessageSeverity.success);
        else
            this.alertService.showMessage(this.gT('toasts.saved'), "Task modified!", alert_service_1.MessageSeverity.success);
        this.submitBtnState = angular_1.ClrLoadingState.SUCCESS;
        this.openModal = false;
    };
    TaskEditComponent.prototype.saveFailedHelper = function (error) {
        this.submitBtnState = angular_1.ClrLoadingState.ERROR;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage(error, null, alert_service_1.MessageSeverity.error);
        console.log(error.error);
        this.clrForm.markAsDirty();
    };
    TaskEditComponent.prototype.resetForm = function () {
        this.loadForm();
        this.alertService.resetStickyMessage();
        this.taskForm.patchValue(this.initialTask);
    };
    TaskEditComponent.prototype.Create = function () {
        console.log(this.allStatus);
        console.log(this.allPriority);
        this.openModal = true;
        this.isNewTask = true;
        this.actionTitle = "Add";
        this.initialTask = new task_model_1.Task();
        this.taskEdit = new task_model_1.Task();
    };
    TaskEditComponent.prototype.Edit = function (task) {
        if (task) {
            this.openModal = true;
            this.isNewTask = false;
            this.actionTitle = "Edit";
            this.taskForm.patchValue(task);
            this.initialTask = new task_model_1.Task();
            Object.assign(this.initialTask, task);
            this.taskEdit = new task_model_1.Task;
            Object.assign(this.taskEdit, task);
            return this.taskEdit;
        }
        else {
            return this.Create();
        }
    };
    TaskEditComponent.prototype.View = function (task) {
        Object.assign(this.initialTask, task);
        this.taskForm.patchValue(this.initialTask);
    };
    TaskEditComponent.prototype.DeleteRange = function (tasks) {
        this.deleteOpen = true;
        this.tasksToDelete = tasks;
        this.taskToDelete = null;
    };
    TaskEditComponent.prototype.DeleteSingle = function (task) {
        this.deleteOpen = true;
        this.taskToDelete = task;
        this.tasksToDelete = null;
    };
    TaskEditComponent.prototype.Delete = function () {
        var _this = this;
        this.deleteBtnState = angular_1.ClrLoadingState.LOADING;
        if (this.tasksToDelete != null) {
            this.taskService.DeleteRangeTasks(this.tasksToDelete).subscribe(function (response) {
                console.log("in multi delete" + _this.tasksToDelete);
                _this.deleteData.emit(_this.tasksToDelete);
                _this.deleteOpen = false;
                _this.alertService.showMessage(_this.gT('toasts.saved'), _this.tasksToDelete.length + " record Deleted!", alert_service_1.MessageSeverity.success);
                _this.deleteBtnState = angular_1.ClrLoadingState.SUCCESS;
            });
        }
        if (this.taskToDelete != null) {
            this.taskService.DeleteTask(this.taskToDelete).subscribe(function (response) {
                _this.tasksToDelete = [];
                _this.tasksToDelete.push(_this.taskToDelete);
                console.log("in single delete" + _this.tasksToDelete);
                _this.deleteData.emit(_this.tasksToDelete);
                _this.deleteOpen = false;
                _this.alertService.showMessage(_this.gT('toasts.saved'), _this.tasksToDelete.length + " record Deleted!", alert_service_1.MessageSeverity.success);
                _this.deleteBtnState = angular_1.ClrLoadingState.SUCCESS;
            });
        }
    };
    __decorate([
        core_1.ViewChild(angular_1.ClrForm),
        __metadata("design:type", Object)
    ], TaskEditComponent.prototype, "clrForm", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TaskEditComponent.prototype, "updateData", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TaskEditComponent.prototype, "deleteData", void 0);
    TaskEditComponent = __decorate([
        core_1.Component({
            selector: 'app-task-edit',
            templateUrl: './task-edit.component.html',
            styleUrls: ['./task-edit.component.css']
        }),
        __metadata("design:paramtypes", [app_translation_service_1.AppTranslationService,
            alert_service_1.AlertService, forms_1.FormBuilder,
            taskService_1.TaskService, account_service_1.AccountService])
    ], TaskEditComponent);
    return TaskEditComponent;
}());
exports.TaskEditComponent = TaskEditComponent;
//# sourceMappingURL=task-edit.component.js.map