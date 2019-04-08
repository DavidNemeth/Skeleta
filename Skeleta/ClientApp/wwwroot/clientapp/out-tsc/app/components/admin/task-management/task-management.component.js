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
        this.tasks = [];
        this.tasksCache = [];
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
    };
    TaskManagementComponent.prototype.loadResolved = function () {
        var _this = this;
        console.log("resolved");
        this.tasks = [];
        this.tasksCache = [];
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.taskService.GetResolvedTask()
            .subscribe(function (results) { return _this.onDataLoadSuccessful(results); }, function (error) { return _this.onDataLoadFailed(error); });
    };
    TaskManagementComponent.prototype.loadCompleted = function () {
        var _this = this;
        console.log("completed");
        this.tasks = [];
        this.tasksCache = [];
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.taskService.GetCompletedTask()
            .subscribe(function (results) { return _this.onDataLoadSuccessful(results); }, function (error) { return _this.onDataLoadFailed(error); });
    };
    TaskManagementComponent.prototype.loadPending = function () {
        var _this = this;
        console.log("pending");
        this.tasks = [];
        this.tasksCache = [];
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.taskService.GetPendingTask()
            .subscribe(function (results) { return _this.onDataLoadSuccessful(results); }, function (error) { return _this.onDataLoadFailed(error); });
    };
    TaskManagementComponent.prototype.onDataLoadSuccessful = function (tasks) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.tasksCache = tasks;
        this.tasks = tasks;
        this.isOpen = true;
    };
    TaskManagementComponent.prototype.onDataLoadFailed = function (error) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.alertService.showStickyMessage('Load Error', "Unable to retrieve users from the server.\r\nErrors: \"" + utilities_1.Utilities.getHttpResponseMessage(error) + "\"", alert_service_1.MessageSeverity.error, error);
        this.isOpen = true;
    };
    TaskManagementComponent.prototype.onSearchChanged = function (value) {
        this.tasks = this.tasksCache
            .filter(function (r) { return utilities_1.Utilities.searchArray(value, false, r.id, r.title, r.priority, r.status, r.developer.fullName, r.developer.fullName); });
    };
    TaskManagementComponent.prototype.addItem = function (task) {
        this.tasks.unshift(task);
        this.isOpen = true;
    };
    TaskManagementComponent.prototype.handleUpdate = function (task) {
        if (this.PendingActive) {
            if (task.status == enum_1.Status.Active || task.status == enum_1.Status.New) {
                this.updateTasks(task);
            }
            else {
                this.removeItem(task);
            }
        }
        if (this.CompletedActive) {
            if (task.status == enum_1.Status.Completed) {
                this.updateTasks(task);
            }
            else {
                this.removeItem(task);
            }
        }
        if (this.ResolvedActive) {
            if (task.status == enum_1.Status.Resolved) {
                this.updateTasks(task);
            }
            else {
                this.removeItem(task);
            }
        }
        this.isOpen = true;
    };
    TaskManagementComponent.prototype.deleteList = function (tasksToDelete) {
        for (var _i = 0, tasksToDelete_1 = tasksToDelete; _i < tasksToDelete_1.length; _i++) {
            var task = tasksToDelete_1[_i];
            this.removeItem(task);
        }
    };
    TaskManagementComponent.prototype.popItem = function (task) {
        this.removeItem(task);
    };
    TaskManagementComponent.prototype.popSelected = function (tasks) {
        for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
            var task = tasks_1[_i];
            this.removeItem(task);
        }
    };
    TaskManagementComponent.prototype.removeItem = function (task) {
        var updateItem = this.tasks.find(this.findIndexToUpdate, task.id);
        var taskIndex = this.tasks.indexOf(task, 0);
        if (taskIndex > -1) {
            this.tasks.splice(taskIndex, 1);
        }
    };
    TaskManagementComponent.prototype.updateTasks = function (newItem) {
        var updateItem = this.tasks.find(this.findIndexToUpdate, newItem.id);
        var index = this.tasks.indexOf(updateItem);
        this.tasks[index] = newItem;
        console.log(newItem);
        console.log(this.tasks);
    };
    TaskManagementComponent.prototype.findIndexToUpdate = function (newItem) {
        return newItem.id === this;
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