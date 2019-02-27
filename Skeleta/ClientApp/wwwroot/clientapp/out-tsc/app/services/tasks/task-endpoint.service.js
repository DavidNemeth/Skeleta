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
        _this._base = '/api/Tasks/';
        _this._all = '/api/Tasks/all';
        _this._pending = '/api/Tasks/pending';
        _this._closed = '/api/Tasks/closed';
        _this._completed = '/api/Tasks/completed';
        return _this;
    }
    Object.defineProperty(TaskEndpoint.prototype, "baseUrl", {
        get: function () { return this.configurations.baseUrl + this._base; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskEndpoint.prototype, "allUrl", {
        get: function () { return this.configurations.baseUrl + this._all; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskEndpoint.prototype, "pendingUrl", {
        get: function () { return this.configurations.baseUrl + this._pending; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskEndpoint.prototype, "closedUrl", {
        get: function () { return this.configurations.baseUrl + this._closed; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskEndpoint.prototype, "completedUrl", {
        get: function () { return this.configurations.baseUrl + this._completed; },
        enumerable: true,
        configurable: true
    });
    TaskEndpoint.prototype.getAllEndpoint = function () {
        var _this = this;
        var endpointUrl = this.allUrl;
        return this.http.get(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getAllEndpoint(); });
        }));
    };
    TaskEndpoint.prototype.getPendingEndpoint = function () {
        var _this = this;
        var endpointUrl = this.pendingUrl;
        return this.http.get(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getPendingEndpoint(); });
        }));
    };
    TaskEndpoint.prototype.getClosedEndpoint = function () {
        var _this = this;
        var endpointUrl = this.closedUrl;
        return this.http.get(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getClosedEndpoint(); });
        }));
    };
    TaskEndpoint.prototype.getCompletedEndpoint = function () {
        var _this = this;
        var endpointUrl = this.completedUrl;
        return this.http.get(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getCompletedEndpoint(); });
        }));
    };
    TaskEndpoint.prototype.getCreateEndpoint = function (taskObject) {
        var _this = this;
        return this.http.post(this.baseUrl, JSON.stringify(taskObject), this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getCreateEndpoint(taskObject); });
        }));
    };
    TaskEndpoint.prototype.getUpdateEndpoint = function (taskObject, taskId) {
        var _this = this;
        var endpointUrl = this.baseUrl + "/" + taskId;
        return this.http.put(endpointUrl, JSON.stringify(taskObject), this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getUpdateEndpoint(taskObject); });
        }));
    };
    TaskEndpoint.prototype.getDeleteEndpoint = function (taskId) {
        var _this = this;
        var endpointUrl = this.baseUrl + "/" + taskId;
        return this.http.delete(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getDeleteEndpoint(taskId); });
        }));
    };
    TaskEndpoint.prototype.getDeleteRangeEndpoint = function (taskIds) {
        var _this = this;
        var endpointUrl = this.baseUrl + "/" + taskIds;
        return this.http.delete(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getDeleteRangeEndpoint(taskIds); });
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