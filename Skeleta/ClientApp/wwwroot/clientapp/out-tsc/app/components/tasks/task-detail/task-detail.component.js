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
var taskService_1 = require("../../../services/tasks/taskService");
var task_model_1 = require("../../../services/tasks/task.model");
var TaskDetailComponent = /** @class */ (function () {
    function TaskDetailComponent(taskService) {
        this.taskService = taskService;
    }
    TaskDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.detail = new task_model_1.ExpandTask();
        this.taskService.GetExpanded(this.taskId).subscribe(function (response) {
            Object.assign(_this.detail, response);
            _this.loading = false;
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TaskDetailComponent.prototype, "taskId", void 0);
    TaskDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-task-detail',
            templateUrl: './task-detail.component.html',
            styleUrls: ['./task-detail.component.css']
        }),
        __metadata("design:paramtypes", [taskService_1.TaskService])
    ], TaskDetailComponent);
    return TaskDetailComponent;
}());
exports.TaskDetailComponent = TaskDetailComponent;
//# sourceMappingURL=task-detail.component.js.map