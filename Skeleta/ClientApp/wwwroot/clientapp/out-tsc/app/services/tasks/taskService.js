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
var http_1 = require("@angular/common/http");
var task_endpoint_service_1 = require("./task-endpoint.service");
var auth_service_1 = require("../auth.service");
var router_1 = require("@angular/router");
var TaskService = /** @class */ (function () {
    function TaskService(router, http, taskEndpoint, authService) {
        this.router = router;
        this.http = http;
        this.taskEndpoint = taskEndpoint;
        this.authService = authService;
    }
    TaskService.prototype.GetAllTask = function () {
        return this.taskEndpoint.getAllEndpoint();
    };
    TaskService.prototype.GetPendingTask = function () {
        return this.taskEndpoint.getPendingEndpoint();
    };
    TaskService.prototype.GetClosedTask = function () {
        return this.taskEndpoint.getClosedEndpoint();
    };
    TaskService.prototype.GetCompletedTask = function () {
        return this.taskEndpoint.getCompletedEndpoint();
    };
    TaskService.prototype.GetResolvedTask = function () {
        return this.taskEndpoint.getResolvedEndpoint();
    };
    TaskService.prototype.NewTask = function (task) {
        return this.taskEndpoint.getCreateEndpoint(task);
    };
    TaskService.prototype.UpdateTask = function (task) {
        return this.taskEndpoint.getUpdateEndpoint(task, task.id);
    };
    TaskService.prototype.DeleteTask = function (task) {
        return this.taskEndpoint.getDeleteEndpoint(task.id);
    };
    TaskService.prototype.DeleteRangeTasks = function (tasks) {
        var ids = [];
        for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
            var task = tasks_1[_i];
            ids.push(task.id);
        }
        return this.taskEndpoint.getDeleteRangeEndpoint(ids);
    };
    Object.defineProperty(TaskService.prototype, "permissions", {
        get: function () {
            return this.authService.userPermissions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskService.prototype, "currentUser", {
        get: function () {
            return this.authService.currentUser;
        },
        enumerable: true,
        configurable: true
    });
    TaskService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, http_1.HttpClient,
            task_endpoint_service_1.TaskEndpoint, auth_service_1.AuthService])
    ], TaskService);
    return TaskService;
}());
exports.TaskService = TaskService;
//# sourceMappingURL=taskService.js.map