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
var BugItemEndpoint = /** @class */ (function (_super) {
    __extends(BugItemEndpoint, _super);
    function BugItemEndpoint(http, configurations, injector) {
        var _this = _super.call(this, http, configurations, injector) || this;
        _this._base = '/api/BugItems/';
        _this._all = '/api/BugItems/all';
        _this._pending = '/api/BugItems/pending';
        _this._closed = '/api/BugItems/closed';
        _this._resolved = '/api/BugItems/resolved';
        return _this;
    }
    Object.defineProperty(BugItemEndpoint.prototype, "baseUrl", {
        get: function () { return this.configurations.baseUrl + this._base; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BugItemEndpoint.prototype, "allUrl", {
        get: function () { return this.configurations.baseUrl + this._all; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BugItemEndpoint.prototype, "pendingUrl", {
        get: function () { return this.configurations.baseUrl + this._pending; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BugItemEndpoint.prototype, "closedUrl", {
        get: function () { return this.configurations.baseUrl + this._closed; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BugItemEndpoint.prototype, "resolvedUrl", {
        get: function () { return this.configurations.baseUrl + this._resolved; },
        enumerable: true,
        configurable: true
    });
    BugItemEndpoint.prototype.getAllEndpoint = function () {
        var _this = this;
        var endpointUrl = this.allUrl;
        return this.http.get(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getAllEndpoint(); });
        }));
    };
    BugItemEndpoint.prototype.getPendingEndpoint = function () {
        var _this = this;
        var endpointUrl = this.pendingUrl;
        return this.http.get(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getPendingEndpoint(); });
        }));
    };
    BugItemEndpoint.prototype.getResolvedEndpoint = function () {
        var _this = this;
        var endpointUrl = this.resolvedUrl;
        return this.http.get(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getResolvedEndpoint(); });
        }));
    };
    BugItemEndpoint.prototype.getClosedEndpoint = function () {
        var _this = this;
        var endpointUrl = this.closedUrl;
        return this.http.get(endpointUrl, this.getRequestHeaders()).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getClosedEndpoint(); });
        }));
    };
    BugItemEndpoint = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, configuration_service_1.ConfigurationService, core_1.Injector])
    ], BugItemEndpoint);
    return BugItemEndpoint;
}(endpoint_factory_service_1.EndpointFactory));
exports.BugItemEndpoint = BugItemEndpoint;
//# sourceMappingURL=bugItem-endpoint.service.js.map