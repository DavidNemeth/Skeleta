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
var animations_1 = require("../../../../services/animations");
var fast_json_patch_1 = require("fast-json-patch");
var ngx_animate_1 = require("ngx-animate");
var animations_2 = require("@angular/animations");
var permission_model_1 = require("../../../../models/permission.model");
var docx = require("docx");
var docx_1 = require("docx");
var file_saver_1 = require("file-saver");
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
        this.deleteOpen = false;
        this.archiveOpen = false;
        this.resolveOpen = false;
        this.completeOpen = false;
        this.releaseOpen = false;
        this.shouldArchive = true;
        this.isNewTask = false;
        this.allStatus = Object.keys(enum_1.Status).slice();
        this.allPriority = Object.keys(enum_1.Priority).slice();
        this.initialTask = new task_model_1.TaskEdit();
        this.taskEdit = new task_model_1.TaskEdit();
        this.tasksToDelete = [];
        this.tasksToClose = [];
        this.tasksToRelease = [];
        this.taskToUpdate = new task_model_1.TaskEdit();
        this.dataLoaded = false;
        this.curDate = new Date();
        this.users = [];
        this.popData = new core_1.EventEmitter();
        this.popSelected = new core_1.EventEmitter();
        this.updateData = new core_1.EventEmitter();
        this.cancel = new core_1.EventEmitter();
        this.refresh = new core_1.EventEmitter();
        this.gT = function (key) { return _this.translationService.getTranslation(key); };
    }
    Object.defineProperty(TaskEditComponent.prototype, "canSetStatus", {
        get: function () {
            return this.accountService.userHasPermission(permission_model_1.Permission.setStatusTasksPremission);
        },
        enumerable: true,
        configurable: true
    });
    TaskEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accountService.getActiveUsers().subscribe(function (users) { return _this.users = users; });
        this.currentUser = this.accountService.currentUser;
    };
    TaskEditComponent.prototype.loadForm = function () {
        this.taskForm = this.formBuilder.group({
            title: ['', forms_1.Validators.required],
            description: [''],
            priority: ['High', forms_1.Validators.required],
            status: [{ value: 'New', disabled: this.isEdit && !this.canSetStatus }, forms_1.Validators.required],
            developerId: [this.currentUser.id],
            testerId: [this.currentUser.id]
        });
        this.dataLoaded = true;
    };
    TaskEditComponent.prototype.cleanup = function () {
        this.taskForm.reset();
        this.isEdit = false;
        this.isNewTask = false;
        this.alertService.resetStickyMessage();
    };
    TaskEditComponent.prototype.close = function () {
        this.cancel.emit();
        this.isOpen = false;
        this.dataLoaded = false;
        this.cleanup();
    };
    TaskEditComponent.prototype.save = function () {
        var _this = this;
        this.submitBtnState = angular_1.ClrLoadingState.LOADING;
        Object.assign(this.taskEdit, this.taskForm.value);
        var patchDocument = fast_json_patch_1.compare(this.initialTask, this.taskEdit);
        if (this.isNewTask) {
            this.taskService.NewTask(this.taskEdit).subscribe(function (task) { return _this.saveSuccessHelper(); }, function (error) { return _this.saveFailedHelper(error); });
        }
        else {
            this.taskService.UpdateTask(patchDocument, this.taskEdit.id).subscribe(function (task) { return _this.saveSuccessHelper(); }, function (error) { return _this.saveFailedHelper(error); });
        }
    };
    TaskEditComponent.prototype.saveSuccessHelper = function () {
        this.refresh.emit();
        Object.assign(this.initialTask, this.taskEdit);
        if (this.isNewTask) {
            this.alertService.showMessage(this.gT('toasts.saved'), "Task added!", alert_service_1.MessageSeverity.success);
        }
        else {
            this.alertService.showMessage(this.gT('toasts.saved'), "Task modified!", alert_service_1.MessageSeverity.success);
        }
        this.submitBtnState = angular_1.ClrLoadingState.SUCCESS;
        this.close();
    };
    TaskEditComponent.prototype.saveFailedHelper = function (error) {
        this.submitBtnState = angular_1.ClrLoadingState.ERROR;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage(error, null, alert_service_1.MessageSeverity.error);
    };
    TaskEditComponent.prototype.Create = function () {
        this.isOpen = true;
        this.isEdit = false;
        this.submitBtnState = angular_1.ClrLoadingState.DEFAULT;
        this.isNewTask = true;
        this.initialTask = new task_model_1.TaskEdit();
        this.taskEdit = new task_model_1.TaskEdit();
        this.loadForm();
    };
    TaskEditComponent.prototype.Edit = function (taskid) {
        var _this = this;
        if (taskid) {
            setTimeout(function () { return _this.isOpen = true; }, 500);
            this.isEdit = true;
            this.taskService.GetTask(taskid).subscribe(function (response) {
                _this.initialTask = new task_model_1.TaskEdit();
                _this.taskEdit = new task_model_1.TaskEdit();
                Object.assign(_this.initialTask, response);
                Object.assign(_this.taskEdit, response);
                _this.createdBy = _this.users.filter(function (x) { return x.id === _this.taskEdit.createdBy; }).map(function (x) { return x.fullName; })[0];
                _this.updatedBy = _this.users.filter(function (x) { return x.id === _this.taskEdit.updatedBy; }).map(function (x) { return x.fullName; })[0];
                _this.submitBtnState = angular_1.ClrLoadingState.DEFAULT;
                _this.isNewTask = false;
                _this.loadForm();
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
            if (task.status === enum_1.Status.New) {
                var taskEdit_1 = new task_model_1.TaskEdit();
                Object.assign(taskEdit_1, task);
                taskEdit_1.status = enum_1.Status.Active;
                var patchDocument = fast_json_patch_1.compare(task, taskEdit_1);
                this.taskService.UpdateTask(patchDocument, task.id).subscribe(function (response) {
                    _this.alertService.showMessage(_this.gT('toasts.saved'), "Task set as Active!", alert_service_1.MessageSeverity.success);
                    _this.updateData.emit(taskEdit_1);
                }, function (error) { return _this.alertService.showMessage(error, null, alert_service_1.MessageSeverity.error); });
            }
            else {
                var taskEdit = new task_model_1.TaskEdit();
                Object.assign(taskEdit, task);
                taskEdit.status = enum_1.Status.Active;
                var patchDocument = fast_json_patch_1.compare(task, taskEdit);
                this.taskService.UpdateTask(patchDocument, task.id).subscribe(function (response) {
                    _this.alertService.showMessage(_this.gT('toasts.saved'), "Task set as Active!", alert_service_1.MessageSeverity.success);
                    _this.popData.emit(response.id);
                }, function (error) { return _this.alertService.showMessage(error, null, alert_service_1.MessageSeverity.error); });
            }
        }
    };
    TaskEditComponent.prototype.onResolved = function () {
        var _this = this;
        if (this.taskToUpdate) {
            var taskEdit = new task_model_1.TaskEdit();
            Object.assign(taskEdit, this.taskToUpdate);
            taskEdit.status = enum_1.Status.Resolved;
            var patchDocument = fast_json_patch_1.compare(this.taskToUpdate, taskEdit);
            this.taskService.UpdateTask(patchDocument, this.taskToUpdate.id).subscribe(function (response) {
                _this.alertService.showMessage(_this.gT('toasts.saved'), "Task " + response.id.toString() + " Resolved!", alert_service_1.MessageSeverity.success);
                _this.popData.emit(response.id);
            }, function (error) { return _this.alertService.showMessage(error, null, alert_service_1.MessageSeverity.error); });
        }
        this.taskToUpdate = new task_model_1.TaskEdit();
        this.resolveOpen = false;
    };
    TaskEditComponent.prototype.onCompleted = function () {
        var _this = this;
        if (this.taskToUpdate) {
            var taskEdit = new task_model_1.TaskEdit();
            Object.assign(taskEdit, this.taskToUpdate);
            taskEdit.status = enum_1.Status.Completed;
            var patchDocument = fast_json_patch_1.compare(this.taskToUpdate, taskEdit);
            this.taskService.UpdateTask(patchDocument, this.taskToUpdate.id).subscribe(function (response) {
                _this.alertService.showMessage(_this.gT('toasts.saved'), "Task " + response.id.toString() + " Completed!", alert_service_1.MessageSeverity.success);
                _this.popData.emit(response.id);
            }, function (error) { return _this.alertService.showMessage(error, null, alert_service_1.MessageSeverity.error); });
        }
        this.taskToUpdate = new task_model_1.TaskEdit();
        this.completeOpen = false;
    };
    TaskEditComponent.prototype.MarkResolved = function (task) {
        Object.assign(this.taskToUpdate, task);
        this.resolveOpen = true;
    };
    TaskEditComponent.prototype.MarkCompleted = function (task) {
        Object.assign(this.taskToUpdate, task);
        this.completeOpen = true;
    };
    TaskEditComponent.prototype.MarkClosed = function (tasks) {
        Object.assign(this.tasksToClose, tasks);
        this.archiveOpen = true;
    };
    TaskEditComponent.prototype.MarkExport = function (tasks) {
        Object.assign(this.tasksToRelease, tasks);
        this.releaseOpen = true;
    };
    TaskEditComponent.prototype.onRelease = function () {
        var _this = this;
        this.download(this.tasksToRelease);
        this.deleteBtnState = angular_1.ClrLoadingState.LOADING;
        if (this.tasksToRelease) {
            for (var i = 0; i < this.tasksToRelease.length; i++) {
                var taskEdit = new task_model_1.TaskList();
                Object.assign(taskEdit, this.tasksToRelease[i]);
                if (this.shouldArchive) {
                    taskEdit.status = enum_1.Status.Closed;
                }
                taskEdit.releaseId = this.releaseGroupname;
                var patchDocument = fast_json_patch_1.compare(this.tasksToRelease[i], taskEdit);
                this.taskService.UpdateTask(patchDocument, taskEdit.id).subscribe(function (response) {
                }, function (error) { return _this.alertService.showMessage(error, null, alert_service_1.MessageSeverity.error); });
            }
        }
        this.alertService.showMessage(this.gT('toasts.saved'), "Release Note Generated, Tasks Archived!", alert_service_1.MessageSeverity.success);
        this.deleteBtnState = angular_1.ClrLoadingState.SUCCESS;
        if (this.shouldArchive) {
            this.popSelected.emit(this.tasksToRelease);
        }
        else {
            this.tasksToRelease = [];
        }
        this.releaseOpen = false;
    };
    TaskEditComponent.prototype.download = function (selected) {
        var doc = new docx.Document();
        var titleDoc = 'Releasenote: ' + this.curDate.toLocaleDateString()
            + '\n' + '\n' + '\n' + '\n' + 'Az alkalmazás az alábbi fejlesztésekkel bővült: '
            + '\n' + '\n' + '\n';
        var maintitle = new docx.Paragraph(titleDoc);
        doc.addParagraph(maintitle);
        for (var _i = 0, selected_1 = selected; _i < selected_1.length; _i++) {
            var task = selected_1[_i];
            var paragraph = new docx.Paragraph(task.id.toString());
            var mainTitle = new docx_1.TextRun(task.title).tab().bold();
            paragraph.addRun(mainTitle);
            doc.addParagraph(paragraph);
        }
        var packer = new docx_1.Packer();
        var title = this.curDate.toLocaleDateString() + '_releasenote.docx';
        packer.toBlob(doc).then(function (blob) {
            console.log(blob);
            file_saver_1.saveAs(blob, title);
            console.log('Document created successfully');
        });
        selected = [];
    };
    TaskEditComponent.prototype.CloseTasks = function () {
        var _this = this;
        this.deleteBtnState = angular_1.ClrLoadingState.LOADING;
        if (this.tasksToClose) {
            for (var i = 0; i < this.tasksToClose.length; i++) {
                var taskEdit = new task_model_1.TaskEdit();
                Object.assign(taskEdit, this.tasksToClose[i]);
                taskEdit.releaseId = this.releaseGroupname;
                taskEdit.status = enum_1.Status.Closed;
                var patchDocument = fast_json_patch_1.compare(this.tasksToClose[i], taskEdit);
                this.taskService.UpdateTask(patchDocument, this.tasksToClose[i].id).subscribe(function (response) {
                }, function (error) { return _this.alertService.showMessage(error, null, alert_service_1.MessageSeverity.error); });
            }
            this.alertService.showMessage(this.gT('toasts.saved'), "Task(s) Archived!", alert_service_1.MessageSeverity.success);
            this.deleteBtnState = angular_1.ClrLoadingState.SUCCESS;
            this.popSelected.emit(this.tasksToClose);
            this.archiveOpen = false;
        }
    };
    TaskEditComponent.prototype.DeleteRange = function (tasks) {
        this.deleteOpen = true;
        Object.assign(this.tasksToDelete, tasks);
        this.taskToUpdate = null;
    };
    TaskEditComponent.prototype.DeleteSingle = function (task) {
        this.deleteOpen = true;
        this.taskToUpdate = task;
        this.tasksToDelete = null;
    };
    TaskEditComponent.prototype.Delete = function () {
        var _this = this;
        this.deleteBtnState = angular_1.ClrLoadingState.LOADING;
        if (this.tasksToDelete != null) {
            this.taskService.DeleteRangeTasks(this.tasksToDelete).subscribe(function (response) {
                _this.refresh.emit();
                _this.deleteBtnState = angular_1.ClrLoadingState.SUCCESS;
                _this.deleteOpen = false;
                _this.alertService.showMessage(_this.gT('toasts.saved'), _this.tasksToDelete.length + " record Deleted!", alert_service_1.MessageSeverity.success);
            });
        }
        if (this.taskToUpdate != null) {
            this.taskToUpdate.status = enum_1.Status.Closed;
            Object.assign(this.initialTask, this.taskToUpdate);
            this.taskToUpdate.status = enum_1.Status.Active;
            var patchDocument = fast_json_patch_1.compare(this.initialTask, this.taskToUpdate);
            this.taskService.UpdateTask(patchDocument, this.taskToUpdate.id).subscribe(function (response) {
                _this.alertService.showMessage(_this.gT('toasts.saved'), "Record Deleted!", alert_service_1.MessageSeverity.success);
                _this.popData.emit(_this.taskToUpdate.id);
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
        core_1.Output(),
        __metadata("design:type", Object)
    ], TaskEditComponent.prototype, "popData", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TaskEditComponent.prototype, "popSelected", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TaskEditComponent.prototype, "updateData", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TaskEditComponent.prototype, "cancel", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TaskEditComponent.prototype, "refresh", void 0);
    TaskEditComponent = __decorate([
        core_1.Component({
            selector: 'app-task-edit',
            templateUrl: './task-edit.component.html',
            styleUrls: ['./task-edit.component.css'],
            animations: [animations_1.fadeInOut,
                animations_2.trigger('bounceIn', [animations_2.transition('void => *', animations_2.useAnimation(ngx_animate_1.bounceIn))])
            ],
        }),
        __metadata("design:paramtypes", [app_translation_service_1.AppTranslationService,
            alert_service_1.AlertService, forms_1.FormBuilder,
            taskService_1.TaskService, account_service_1.AccountService])
    ], TaskEditComponent);
    return TaskEditComponent;
}());
exports.TaskEditComponent = TaskEditComponent;
//# sourceMappingURL=task-edit.component.js.map