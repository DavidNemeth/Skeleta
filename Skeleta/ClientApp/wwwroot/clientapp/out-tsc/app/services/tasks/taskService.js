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
    TaskService.prototype.getAllTask = function () {
        return this.taskEndpoint.getAllTasksEndpoint();
    };
    TaskService.prototype.getPendingTasks = function () {
        return this.taskEndpoint.getPendingTasksEndpoint();
    };
    TaskService.prototype.getClosedTasks = function () {
        return this.taskEndpoint.getClosedTasksEndpoint();
    };
    TaskService.prototype.getCompletedTasks = function () {
        return this.taskEndpoint.getCompletedTasksEndpoint();
    };
    TaskService.prototype.newTask = function (task) {
        return this.taskEndpoint.getCreateTaskEndpoint(task);
    };
    TaskService.prototype.updateTask = function (task) {
        return this.taskEndpoint.getUpdateTaskEndpoint(task);
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