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
var animations_1 = require("../../../services/animations");
var enum_1 = require("../../../models/enum");
var angular_1 = require("@clr/angular");
var TaskManagementComponent = /** @class */ (function () {
    function TaskManagementComponent(accountService, alertService, translationService, taskService, renderer) {
        var _this = this;
        this.accountService = accountService;
        this.alertService = alertService;
        this.translationService = translationService;
        this.taskService = taskService;
        this.renderer = renderer;
        this.columns = [];
        this.pendingTasks = [];
        this.pendingTasksCache = [];
        this.resolvedTasks = [];
        this.resolvedTasksCache = [];
        this.completedTasks = [];
        this.completedTasksCache = [];
        this.archivedTasks = [];
        this.archivedTasksCache = [];
        this.selected = [];
        this.gT = function (key) { return _this.translationService.getTranslation(key); };
        this.curDate = new Date();
        this.isOpen = true;
    }
    TaskManagementComponent.prototype.ngOnInit = function () {
        this.PendingActive = true;
        this.loadPending();
    };
    TaskManagementComponent.prototype.onAdd = function () {
        this.taskEdit.Create();
        this.isOpen = false;
    };
    TaskManagementComponent.prototype.onEdit = function (task) {
        this.taskEdit.Edit(task.id);
        this.isOpen = false;
    };
    TaskManagementComponent.prototype.onClose = function (tasks) {
        this.taskEdit.MarkClosed(tasks);
    };
    TaskManagementComponent.prototype.onActive = function (task) {
        this.taskEdit.MarkActive(task);
    };
    TaskManagementComponent.prototype.onResolved = function (task) {
        this.taskEdit.MarkResolved(task);
    };
    TaskManagementComponent.prototype.onCompleted = function (task) {
        this.taskEdit.MarkCompleted(task);
    };
    TaskManagementComponent.prototype.onExportSelected = function (selected, exportOption) {
        var _this = this;
        switch (exportOption) {
            case 'excel':
                var csv = this.selected.map(function (task) { return _this.taskToFile(task); }).join("\n");
                var titlecsv = "Releasenote;" + this.curDate.toLocaleDateString() + "\n" + "Id;Title" + "\n";
                this.renderer.setAttribute(this.excelLink.nativeElement, "href", "data:text/plain;charset=utf-8," + titlecsv + csv);
            case 'word':
                var docx = this.selected.map(function (task) { return _this.excelToFile(task); }).join("\n\n");
                var titleDoc = "Releasenote: " + this.curDate.toLocaleDateString() + "\n" + "\n" + "\n" + "\n" + "Az alkalmazás az alábbi fejlesztésekkel bővült: " + "\n" + "\n" + "\n";
                this.renderer.setAttribute(this.wordLink.nativeElement, "href", "data:text/plain;charset=utf-8," + titleDoc + docx);
            case 'pdf':
                var pdf = this.selected.map(function (task) { return _this.taskToFile(task); }).join("\n");
                var titlePdf = "Releasenote" + this.curDate.toLocaleDateString() + "\n" + "Id;Title" + "\n";
                this.renderer.setAttribute(this.pdfLink.nativeElement, "href", "data:text/plain;charset=utf-8," + titlePdf + pdf);
            default:
        }
    };
    TaskManagementComponent.prototype.taskToFile = function (task) {
        return [task.id, task.title].join(';');
    };
    TaskManagementComponent.prototype.excelToFile = function (task) {
        return ["Azonositó: " + task.id + " Fejlesztés: " + task.title];
    };
    TaskManagementComponent.prototype.loadData = function () {
        if (this.CompletedActive) {
            this.loadCompleted();
        }
        if (this.ResolvedActive) {
            this.loadResolved();
        }
        if (this.PendingActive) {
            this.loadPending();
        }
        if (this.ArchivedActive) {
            this.loadClosed();
        }
    };
    TaskManagementComponent.prototype.loadPending = function () {
        var _this = this;
        this.pendingTasks = [];
        this.pendingTasksCache = [];
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.taskService.GetPendingTask()
            .subscribe(function (results) { return _this.onDataLoadSuccessful(results, enum_1.Status.Active); }, function (error) { return _this.onDataLoadFailed(error); });
    };
    TaskManagementComponent.prototype.loadResolved = function () {
        var _this = this;
        this.resolvedTasks = [];
        this.resolvedTasksCache = [];
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.taskService.GetResolvedTask()
            .subscribe(function (results) { return _this.onDataLoadSuccessful(results, enum_1.Status.Resolved); }, function (error) { return _this.onDataLoadFailed(error); });
    };
    TaskManagementComponent.prototype.loadCompleted = function () {
        var _this = this;
        this.completedTasks = [];
        this.completedTasksCache = [];
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.taskService.GetCompletedTask()
            .subscribe(function (results) { return _this.onDataLoadSuccessful(results, enum_1.Status.Completed); }, function (error) { return _this.onDataLoadFailed(error); });
    };
    TaskManagementComponent.prototype.loadClosed = function () {
        var _this = this;
        this.archivedTasks = [];
        this.archivedTasksCache = [];
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.taskService.GetClosedTask()
            .subscribe(function (results) { return _this.onDataLoadSuccessful(results, enum_1.Status.Closed); }, function (error) { return _this.onDataLoadFailed(error); });
    };
    TaskManagementComponent.prototype.onDataLoadSuccessful = function (tasks, status) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        if (status == enum_1.Status.Active) {
            this.pendingTasks = tasks;
            this.pendingTasksCache = tasks;
        }
        if (status == enum_1.Status.Resolved) {
            this.resolvedTasks = tasks;
            this.resolvedTasksCache = tasks;
        }
        if (status == enum_1.Status.Completed) {
            this.completedTasks = tasks;
            this.completedTasksCache = tasks;
        }
        if (status == enum_1.Status.Closed) {
            this.archivedTasks = tasks;
            this.archivedTasksCache = tasks;
        }
        this.isOpen = true;
        console.log("data loaded");
        this.grid.refresh;
    };
    TaskManagementComponent.prototype.onDataLoadFailed = function (error) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        console.log("Error while fetching list: ", error);
        this.alertService.showStickyMessage('Load Error', "Unable to retrieve users from the server.\r\nErrors: \"" + utilities_1.Utilities.getHttpResponseMessage(error) + "\"", alert_service_1.MessageSeverity.error, error);
        this.isOpen = true;
    };
    TaskManagementComponent.prototype.onSearchChanged = function (value) {
        if (this.CompletedActive) {
            this.pendingTasks = this.pendingTasksCache
                .filter(function (r) { return utilities_1.Utilities.searchArray(value, false, r.id, r.title, r.priority, r.status, r.developer.fullName, r.developer.fullName); });
        }
        if (this.ResolvedActive) {
            this.resolvedTasks = this.resolvedTasksCache
                .filter(function (r) { return utilities_1.Utilities.searchArray(value, false, r.id, r.title, r.priority, r.status, r.developer.fullName, r.developer.fullName); });
        }
        if (this.PendingActive) {
            this.completedTasks = this.completedTasksCache
                .filter(function (r) { return utilities_1.Utilities.searchArray(value, false, r.id, r.title, r.priority, r.status, r.developer.fullName, r.developer.fullName); });
        }
    };
    TaskManagementComponent.prototype.deleteList = function (tasksToDelete) {
        for (var _i = 0, tasksToDelete_1 = tasksToDelete; _i < tasksToDelete_1.length; _i++) {
            var task = tasksToDelete_1[_i];
            this.removeItem(task.id);
        }
    };
    TaskManagementComponent.prototype.popItem = function (id) {
        this.removeItem(id);
    };
    TaskManagementComponent.prototype.popSelected = function (tasks) {
        for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
            var task = tasks_1[_i];
            this.removeItem(task.id);
        }
    };
    TaskManagementComponent.prototype.removeItem = function (id) {
        if (this.CompletedActive) {
            var task = this.completedTasks.filter(function (x) { return x.id == id; })[0];
            var updateItem = this.completedTasks.find(this.findIndexToUpdate, task.id);
            var taskIndex = this.completedTasks.indexOf(task, 0);
            if (taskIndex > -1) {
                this.completedTasks.splice(taskIndex, 1);
            }
        }
        if (this.ResolvedActive) {
            var task = this.resolvedTasks.filter(function (x) { return x.id == id; })[0];
            var updateItem = this.resolvedTasks.find(this.findIndexToUpdate, task.id);
            var taskIndex = this.resolvedTasks.indexOf(task, 0);
            if (taskIndex > -1) {
                this.resolvedTasks.splice(taskIndex, 1);
            }
        }
        if (this.PendingActive) {
            var task = this.pendingTasks.filter(function (x) { return x.id == id; })[0];
            var updateItem = this.pendingTasks.find(this.findIndexToUpdate, task.id);
            var taskIndex = this.pendingTasks.indexOf(task, 0);
            if (taskIndex > -1) {
                this.pendingTasks.splice(taskIndex, 1);
            }
        }
    };
    TaskManagementComponent.prototype.findIndexToUpdate = function (newItem) {
        return newItem.id === this;
    };
    TaskManagementComponent.prototype.handleUpdate = function (task) {
        if (this.PendingActive) {
            if (task.status == enum_1.Status.Active || task.status == enum_1.Status.New) {
                var updateItem = this.pendingTasks.find(this.findIndexToUpdate, task.id);
                var index = this.pendingTasks.indexOf(updateItem);
                this.pendingTasks[index] = task;
            }
            else {
                this.removeItem(task.id);
            }
        }
        if (this.CompletedActive) {
            if (task.status == enum_1.Status.Completed) {
                var updateItem = this.completedTasks.find(this.findIndexToUpdate, task.id);
                var index = this.completedTasks.indexOf(updateItem);
                this.completedTasks[index] = task;
            }
            else {
                this.removeItem(task.id);
            }
        }
    };
    TaskManagementComponent.prototype.open = function () {
        this.isOpen = true;
    };
    __decorate([
        core_1.ViewChild(angular_1.ClrDatagrid),
        __metadata("design:type", angular_1.ClrDatagrid)
    ], TaskManagementComponent.prototype, "grid", void 0);
    __decorate([
        core_1.ViewChild(task_edit_component_1.TaskEditComponent),
        __metadata("design:type", Object)
    ], TaskManagementComponent.prototype, "taskEdit", void 0);
    __decorate([
        core_1.ViewChild("excel"),
        __metadata("design:type", core_1.ElementRef)
    ], TaskManagementComponent.prototype, "excelLink", void 0);
    __decorate([
        core_1.ViewChild("word"),
        __metadata("design:type", core_1.ElementRef)
    ], TaskManagementComponent.prototype, "wordLink", void 0);
    __decorate([
        core_1.ViewChild("pdf"),
        __metadata("design:type", core_1.ElementRef)
    ], TaskManagementComponent.prototype, "pdfLink", void 0);
    TaskManagementComponent = __decorate([
        core_1.Component({
            selector: 'app-task-management',
            templateUrl: './task-management.component.html',
            styleUrls: ['./task-management.component.css'],
            animations: [animations_1.fadeInOut]
        }),
        __metadata("design:paramtypes", [account_service_1.AccountService, alert_service_1.AlertService,
            app_translation_service_1.AppTranslationService, taskService_1.TaskService, core_1.Renderer2])
    ], TaskManagementComponent);
    return TaskManagementComponent;
}());
exports.TaskManagementComponent = TaskManagementComponent;
//# sourceMappingURL=task-management.component.js.map