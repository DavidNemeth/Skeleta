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
var task_edit_component_1 = require("../../controls/editors/task-edit/task-edit.component");
var alert_service_1 = require("../../../services/alert.service");
var taskService_1 = require("../../../services/tasks/taskService");
var app_translation_service_1 = require("../../../services/app-translation.service");
var utilities_1 = require("../../../services/utilities");
var account_service_1 = require("../../../services/account.service");
var TaskManagementComponent = /** @class */ (function () {
    function TaskManagementComponent(accountService, alertService, translationService, taskService) {
        var _this = this;
        this.accountService = accountService;
        this.alertService = alertService;
        this.translationService = translationService;
        this.taskService = taskService;
        this.columns = [];
        this.tasks = [];
        this.tasksCache = [];
        this.selected = [];
        this.gT = function (key) { return _this.translationService.getTranslation(key); };
    }
    TaskManagementComponent.prototype.ngOnInit = function () {
        this.PendingActive = true;
        this.loadData();
        this.nameFilterValue = this.accountService.currentUser.fullName;
    };
    TaskManagementComponent.prototype.onAdd = function () {
        this.sourceTask = null;
        this.taskEdit.Create();
    };
    TaskManagementComponent.prototype.onActive = function (task) {
        this.sourceTask = task;
        this.taskEdit.MarkActive(task);
    };
    TaskManagementComponent.prototype.onResolved = function (task) {
        this.sourceTask = task;
        this.taskEdit.MarkResolved(task);
    };
    TaskManagementComponent.prototype.onCompleted = function (task) {
        this.sourceTask = task;
        this.taskEdit.MarkCompleted(task);
    };
    TaskManagementComponent.prototype.onEdit = function (task) {
        this.sourceTask = task;
        this.taskEdit.Edit(task);
    };
    TaskManagementComponent.prototype.onDelete = function (task) {
        if (task) {
            this.taskEdit.DeleteSingle(task);
        }
        else {
            if (this.selected.length > 0) {
                this.taskEdit.DeleteRange(this.selected);
            }
        }
    };
    TaskManagementComponent.prototype.onExportAll = function () {
    };
    TaskManagementComponent.prototype.onExportSelected = function () {
    };
    TaskManagementComponent.prototype.loadResolved = function () {
        var _this = this;
        this.tasks = [];
        this.tasksCache = [];
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.taskService.GetResolvedTask()
            .subscribe(function (results) { return _this.onDataLoadSuccessful(results); }, function (error) { return _this.onDataLoadFailed(error); });
    };
    TaskManagementComponent.prototype.loadCompleted = function () {
        var _this = this;
        this.tasks = [];
        this.tasksCache = [];
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.taskService.GetCompletedTask()
            .subscribe(function (results) { return _this.onDataLoadSuccessful(results); }, function (error) { return _this.onDataLoadFailed(error); });
    };
    TaskManagementComponent.prototype.loadPending = function () {
        var _this = this;
        this.tasks = [];
        this.tasksCache = [];
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.taskService.GetPendingTask()
            .subscribe(function (results) { return _this.onDataLoadSuccessful(results); }, function (error) { return _this.onDataLoadFailed(error); });
    };
    TaskManagementComponent.prototype.onDataLoadSuccessful = function (tasks) {
        for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
            var item = tasks_1[_i];
            item.assignedToName = item.assignedTo.fullName;
        }
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.tasksCache = tasks;
        this.tasks = tasks;
    };
    TaskManagementComponent.prototype.onDataLoadFailed = function (error) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.alertService.showStickyMessage('Load Error', "Unable to retrieve users from the server.\r\nErrors: \"" + utilities_1.Utilities.getHttpResponseMessage(error) + "\"", alert_service_1.MessageSeverity.error, error);
    };
    TaskManagementComponent.prototype.onSearchChanged = function (value) {
        this.tasks = this.tasksCache
            .filter(function (r) { return utilities_1.Utilities.searchArray(value, false, r.id, r.title, r.description, r.priority, r.status, r.assignedToName); });
    };
    TaskManagementComponent.prototype.updateList = function (returnTask) {
        this.loadData();
    };
    TaskManagementComponent.prototype.deleteList = function (tasksToDelete) {
        this.loadData();
    };
    TaskManagementComponent.prototype.loadData = function () {
        if (this.PendingActive) {
            this.loadPending();
        }
        if (this.CompletedActive) {
            this.loadCompleted();
        }
        if (this.ResolvedActive) {
            this.loadResolved();
        }
    };
    __decorate([
        core_1.ViewChild(task_edit_component_1.TaskEditComponent),
        __metadata("design:type", Object)
    ], TaskManagementComponent.prototype, "taskEdit", void 0);
    TaskManagementComponent = __decorate([
        core_1.Component({
            selector: 'app-task-management',
            templateUrl: './task-management.component.html',
            styleUrls: ['./task-management.component.css']
        }),
        __metadata("design:paramtypes", [account_service_1.AccountService, alert_service_1.AlertService,
            app_translation_service_1.AppTranslationService, taskService_1.TaskService])
    ], TaskManagementComponent);
    return TaskManagementComponent;
}());
exports.TaskManagementComponent = TaskManagementComponent;
//# sourceMappingURL=task-management.component.js.map