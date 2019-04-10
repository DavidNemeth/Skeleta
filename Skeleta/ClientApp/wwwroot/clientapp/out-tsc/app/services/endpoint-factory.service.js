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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var auth_service_1 = require("./auth.service");
var configuration_service_1 = require("./configuration.service");
var EndpointFactory = /** @class */ (function () {
    function EndpointFactory(http, configurations, injector) {
        this.http = http;
        this.configurations = configurations;
        this.injector = injector;
        this._loginUrl = '/connect/token';
    }
    EndpointFactory_1 = EndpointFactory;
    Object.defineProperty(EndpointFactory.prototype, "loginUrl", {
        get: function () { return this.configurations.baseUrl + this._loginUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EndpointFactory.prototype, "authService", {
        get: function () {
            if (!this._authService)
                this._authService = this.injector.get(auth_service_1.AuthService);
            return this._authService;
        },
        enumerable: true,
        configurable: true
    });
    EndpointFactory.prototype.getLoginEndpoint = function (userName, password) {
        var header = new http_1.HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var params = new http_1.HttpParams()
            .append('username', userName)
            .append('password', password)
            .append('grant_type', 'password')
            .append('scope', 'openid email phone profile offline_access roles');
        var requestBody = params.toString();
        return this.http.post(this.loginUrl, requestBody, { headers: header });
    };
    EndpointFactory.prototype.getRefreshLoginEndpoint = function () {
        var _this = this;
        var header = new http_1.HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var params = new http_1.HttpParams()
            .append('refresh_token', this.authService.refreshToken)
            .append('grant_type', 'refresh_token')
            .append('scope', 'openid email phone profile offline_access roles');
        var requestBody = params.toString();
        return this.http.post(this.loginUrl, requestBody, { headers: header }).pipe(operators_1.catchError(function (error) {
            return _this.handleError(error, function () { return _this.getRefreshLoginEndpoint(); });
        }));
    };
    EndpointFactory.prototype.getRequestHeaders = function () {
        var headers = new http_1.HttpHeaders({
            'Authorization': 'Bearer ' + this.authService.accessToken,
            'Content-Type': 'application/json',
            'Accept': "application/vnd.iman.v" + EndpointFactory_1.apiVersion + "+json, application/json, text/plain, */*",
            'App-Version': configuration_service_1.ConfigurationService.appVersion
        });
        return { headers: headers };
    };
    EndpointFactory.prototype.getRequestPatchHeaders = function () {
        var headers = new http_1.HttpHeaders({
            'Authorization': 'Bearer ' + this.authService.accessToken,
            'Content-Type': 'application/json-patch+json',
            'Accept': "application/vnd.iman.v" + EndpointFactory_1.apiVersion + "+json, application/json-patch+json, text/plain, */*",
            'App-Version': configuration_service_1.ConfigurationService.appVersion
        });
        return { headers: headers };
    };
    EndpointFactory.prototype.handleError = function (error, continuation) {
        var _this = this;
        if (error.status == 401) {
            if (this.isRefreshingLogin) {
                return this.pauseTask(continuation);
            }
            this.isRefreshingLogin = true;
            return this.authService.refreshLogin().pipe(operators_1.mergeMap(function (data) {
                _this.isRefreshingLogin = false;
                _this.resumeTasks(true);
                return continuation();
            }), operators_1.catchError(function (refreshLoginError) {
                _this.isRefreshingLogin = false;
                _this.resumeTasks(false);
                if (refreshLoginError.status == 401 || (refreshLoginError.url && refreshLoginError.url.toLowerCase()
                    .includes(_this.loginUrl.toLowerCase()))) {
                    _this.authService.reLogin();
                    return rxjs_1.throwError('session expired');
                }
                else {
                    return rxjs_1.throwError(refreshLoginError || 'server error');
                }
            }));
        }
        if (error.url && error.url.toLowerCase().includes(this.loginUrl.toLowerCase())) {
            this.authService.reLogin();
            return rxjs_1.throwError((error.error && error.error.error_description) ? "session expired (" + error.error.error_description + ")" :
                'session expired');
        }
        else {
            return rxjs_1.throwError(error);
        }
    };
    EndpointFactory.prototype.pauseTask = function (continuation) {
        if (!this.taskPauser)
            this.taskPauser = new rxjs_1.Subject();
        return this.taskPauser.pipe(operators_1.switchMap(function (continueOp) {
            return continueOp ? continuation() : rxjs_1.throwError('session expired');
        }));
    };
    EndpointFactory.prototype.resumeTasks = function (continueOp) {
        var _this = this;
        setTimeout(function () {
            if (_this.taskPauser) {
                _this.taskPauser.next(continueOp);
                _this.taskPauser.complete();
                _this.taskPauser = null;
            }
        });
    };
    var EndpointFactory_1;
    EndpointFactory.apiVersion = '1';
    EndpointFactory = EndpointFactory_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, configuration_service_1.ConfigurationService, core_1.Injector])
    ], EndpointFactory);
    return EndpointFactory;
}());
exports.EndpointFactory = EndpointFactory;
//# sourceMappingURL=endpoint-factory.service.js.map