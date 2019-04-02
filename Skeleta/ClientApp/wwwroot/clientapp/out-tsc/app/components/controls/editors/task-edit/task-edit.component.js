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
        this.popData = new core_1.EventEmitter();
        this.updateStatus = new core_1.EventEmitter();
        this.updateData = new core_1.EventEmitter();
        this.deleteData = new core_1.EventEmitter();
        this.openClose = new core_1.EventEmitter();
    }
    TaskEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accountService.getUsers().subscribe(function (users) { return _this.users = users; });
        this.currentUser = this.accountService.currentUser;
        this.loadForm();
    };
    TaskEditComponent.prototype.loadForm = function () {
        this.taskForm = this.formBuilder.group({
            title: ['', forms_1.Validators.required],
            description: [''],
            priority: ['High', forms_1.Validators.required],
            status: ['New', forms_1.Validators.required],
            developerId: [this.currentUser.id],
            testerId: [this.currentUser.id]
        });
    };
    TaskEditComponent.prototype.close = function () {
        this.isEdit = false;
        this.isOpen = false;
        this.openClose.emit();
        this.isNewTask = false;
        this.loadForm();
        this.alertService.resetStickyMessage();
    };
    TaskEditComponent.prototype.save = function () {
        var _this = this;
        this.submitBtnState = angular_1.ClrLoadingState.LOADING;
        Object.assign(this.taskEdit, this.taskForm.value);
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
        this.close();
    };
    TaskEditComponent.prototype.saveFailedHelper = function (error) {
        this.submitBtnState = angular_1.ClrLoadingState.ERROR;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage(error, null, alert_service_1.MessageSeverity.error);
    };
    TaskEditComponent.prototype.resetForm = function () {
        this.loadForm();
        this.alertService.resetStickyMessage();
        if (!this.isNewTask) {
            this.taskForm.patchValue(this.initialTask);
        }
    };
    TaskEditComponent.prototype.Create = function () {
        this.isEdit = false;
        this.submitBtnState = angular_1.ClrLoadingState.DEFAULT;
        this.isNewTask = true;
        this.actionTitle = "Add";
        this.initialTask = new task_model_1.Task();
        this.taskEdit = new task_model_1.Task();
    };
    TaskEditComponent.prototype.Edit = function (taskid) {
        var _this = this;
        if (taskid) {
            this.isEdit = true;
            this.taskService.GetTask(taskid).subscribe(function (response) {
                _this.initialTask = new task_model_1.Task();
                Object.assign(_this.initialTask, response);
                _this.taskEdit = new task_model_1.Task;
                Object.assign(_this.taskEdit, response);
                _this.submitBtnState = angular_1.ClrLoadingState.DEFAULT;
                _this.isNewTask = false;
                _this.actionTitle = "Edit";
                _this.taskForm.patchValue(_this.taskEdit);
            }, function (error) {
                console.log(error);
                _this.Create();
            });
        }
        else {
            this.Create();
        }
    };
    TaskEditComponent.prototype.MarkActive = function (task) {
        var _this = this;
        if (task) {
            if (task.status == enum_1.Status.New) {
                this.taskService.GetTask(task.id).subscribe(function (editTask) {
                    editTask.status = enum_1.Status.Active;
                    _this.taskService.UpdateTask(editTask).subscribe(function (response) {
                        _this.alertService.showMessage(_this.gT('toasts.saved'), "Task set as Resolved!", alert_service_1.MessageSeverity.success);
                        Object.assign(task, editTask);
                        _this.updateStatus.emit(task);
                    }, function (error) { return _this.alertService.showMessage(error, null, alert_service_1.MessageSeverity.error); });
                });
            }
            else {
                this.taskService.GetTask(task.id).subscribe(function (editTask) {
                    editTask.status = enum_1.Status.Active;
                    _this.taskService.UpdateTask(editTask).subscribe(function (response) {
                        _this.alertService.showMessage(_this.gT('toasts.saved'), "Task set as Resolved!", alert_service_1.MessageSeverity.success);
                        _this.popData.emit(task);
                    }, function (error) { return _this.alertService.showMessage(error, null, alert_service_1.MessageSeverity.error); });
                });
            }
        }
    };
    TaskEditComponent.prototype.MarkResolved = function (task) {
        var _this = this;
        if (task) {
            this.taskService.GetTask(task.id).subscribe(function (editTask) {
                editTask.status = enum_1.Status.Resolved;
                _this.taskService.UpdateTask(editTask).subscribe(function (response) {
                    _this.alertService.showMessage(_this.gT('toasts.saved'), "Task set as Resolved!", alert_service_1.MessageSeverity.success);
                    _this.popData.emit(task);
                }, function (error) { return _this.alertService.showMessage(error, null, alert_service_1.MessageSeverity.error); });
            });
        }
    };
    TaskEditComponent.prototype.MarkCompleted = function (task) {
        var _this = this;
        if (task) {
            this.taskService.GetTask(task.id).subscribe(function (editTask) {
                editTask.status = enum_1.Status.Completed;
                _this.taskService.UpdateTask(editTask).subscribe(function (response) {
                    _this.alertService.showMessage(_this.gT('toasts.saved'), "Task set as Completed!", alert_service_1.MessageSeverity.success);
                    _this.popData.emit(task);
                }, function (error) { return _this.alertService.showMessage(error, null, alert_service_1.MessageSeverity.error); });
            });
        }
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
                _this.deleteData.emit(_this.tasksToDelete);
                _this.deleteBtnState = angular_1.ClrLoadingState.SUCCESS;
                _this.deleteOpen = false;
                _this.alertService.showMessage(_this.gT('toasts.saved'), _this.tasksToDelete.length + " record Deleted!", alert_service_1.MessageSeverity.success);
            });
        }
        if (this.taskToDelete != null) {
            this.taskToDelete.status = enum_1.Status.Closed;
            this.taskService.UpdateTask(this.taskToDelete).subscribe(function (response) {
                _this.alertService.showMessage(_this.gT('toasts.saved'), "Record Deleted!", alert_service_1.MessageSeverity.success);
                _this.popData.emit(_this.taskToDelete);
                _this.deleteBtnState = angular_1.ClrLoadingState.SUCCESS;
                _this.deleteOpen = false;
            }, function (error) { return _this.alertService.showMessage(error, null, alert_service_1.MessageSeverity.error); });
        }
    };
    __decorate([
        core_1.ViewChild(angular_1.ClrForm),
        __metadata("design:type", Object)
    ], TaskEditComponent.prototype, "clrForm", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TaskEditComponent.prototype, "isOpen", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TaskEditComponent.prototype, "popData", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TaskEditComponent.prototype, "updateStatus", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TaskEditComponent.prototype, "updateData", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TaskEditComponent.prototype, "deleteData", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TaskEditComponent.prototype, "openClose", void 0);
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