"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var operators_1 = require("rxjs/operators");
var endpoint_factory_service_1 = require("../endpoint-factory.service");
var configuration_service_1 = require("../configuration.service");
var TaskEndpoint = /** @class */ (function (_super) {
    __extends(TaskEndpoint, _super);
    function TaskEndpoint(http, configurations, injector) {
        var _this = _super.call(this, http, configurations, injector) || this;
        _this._tasksUrl = '/api/Tasks/';
        _this._allTasksUrl = '/api/Tasks/all';
        _this._pendingTasksUrl = '/api/Tasks/pending';
        _this._closedTasksUrl = '/api/Tasks/closed';
        _this._completedTasksUrl = '/api/Tasks/completed';
        return _this;
    }
    Object.defineProperty(TaskEndpoint.prototype, "tasksUrl", {
        get: function () { return this.configurations.baseUrl + this._tasksUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskEndpoint.prototype, "allTasksUrl", {
        get: function () { return this.configurations.baseUrl + this._allTasksUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskEndpoint.prototype, "pendingTasksUrl", {
        get: function () { return this.configurations.baseUrl + this._pendingTasksUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskEndpoint.prototype, "closedTasksUrl", {
        get: function () { return this.configurations.baseUrl + this._closedTasksUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskEndpoint.prototype, "completedTasksUrl", {
        get: function () { return this.configurations.baseUrl + this._completedTasksUrl; },
        enumerable: true,
        configurable: true
    });
    TaskEndpoint.prototype.getAllTasksEndpoint = function () {
        var _this = this;
        var endpointUrl = this.allTasksUrl;
        return this.http.get(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getAllTasksEndpoint(); });
        }));
    };
    TaskEndpoint.prototype.getPendingTasksEndpoint = function () {
        var _this = this;
        var endpointUrl = this.pendingTasksUrl;
        return this.http.get(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getPendingTasksEndpoint(); });
        }));
    };
    TaskEndpoint.prototype.getClosedTasksEndpoint = function () {
        var _this = this;
        var endpointUrl = this.closedTasksUrl;
        return this.http.get(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getClosedTasksEndpoint(); });
        }));
    };
    TaskEndpoint.prototype.getCompletedTasksEndpoint = function () {
        var _this = this;
        var endpointUrl = this.completedTasksUrl;
        return this.http.get(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getCompletedTasksEndpoint(); });
        }));
    };
    TaskEndpoint.prototype.getCreateTaskEndpoint = function (taskObject) {
        var _this = this;
        return this.http.post(this._tasksUrl, JSON.stringify(taskObject), this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getCreateTaskEndpoint(taskObject); });
        }));
    };
    TaskEndpoint.prototype.getUpdateTaskEndpoint = function (taskObject) {
        var _this = this;
        return this.http.put(this._tasksUrl, JSON.stringify(taskObject), this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getUpdateTaskEndpoint(taskObject); });
        }));
    };
    TaskEndpoint = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, configuration_service_1.ConfigurationService, core_1.Injector])
    ], TaskEndpoint);
    return TaskEndpoint;
}(endpoint_factory_service_1.EndpointFactory));
exports.TaskEndpoint = TaskEndpoint;
//# sourceMappingURL=task-endpoint.service.js.map