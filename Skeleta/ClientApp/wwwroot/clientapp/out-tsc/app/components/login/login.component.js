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
var alert_service_1 = require("../../services/alert.service");
var auth_service_1 = require("../../services/auth.service");
var configuration_service_1 = require("../../services/configuration.service");
var utilities_1 = require("../../services/utilities");
var user_login_model_1 = require("../../models/user-login.model");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(alertService, authService, configurations) {
        this.alertService = alertService;
        this.authService = authService;
        this.configurations = configurations;
        this.userLogin = new user_login_model_1.UserLogin();
        this.isLoading = false;
        this.formResetToggle = true;
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userLogin.rememberMe = this.authService.rememberMe;
        if (this.getShouldRedirect()) {
            this.authService.redirectLoginUser();
        }
        else {
            this.loginStatusSubscription = this.authService.getLoginStatusEvent().subscribe(function (isLoggedIn) {
                if (_this.getShouldRedirect()) {
                    _this.authService.redirectLoginUser();
                }
            });
        }
    };
    LoginComponent.prototype.ngOnDestroy = function () {
        if (this.loginStatusSubscription)
            this.loginStatusSubscription.unsubscribe();
    };
    LoginComponent.prototype.getShouldRedirect = function () {
        return this.authService.isLoggedIn && !this.authService.isSessionExpired;
    };
    LoginComponent.prototype.showErrorAlert = function (caption, message) {
        this.alertService.showMessage(caption, message, alert_service_1.MessageSeverity.error);
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.isLoading = true;
        this.alertService.startLoadingMessage('', 'Attempting login...');
        this.authService.login(this.userLogin.email, this.userLogin.password, this.userLogin.rememberMe)
            .subscribe(function (user) {
            setTimeout(function () {
                _this.alertService.stopLoadingMessage();
                _this.isLoading = false;
                _this.reset();
                _this.alertService.showMessage('Login', "Welcome " + user.userName + "!", alert_service_1.MessageSeverity.success);
            }, 500);
        }, function (error) {
            _this.alertService.stopLoadingMessage();
            if (utilities_1.Utilities.checkNoNetwork(error)) {
                _this.alertService.showStickyMessage(utilities_1.Utilities.noNetworkMessageCaption, utilities_1.Utilities.noNetworkMessageDetail, alert_service_1.MessageSeverity.error, error);
                _this.offerAlternateHost();
            }
            else {
                var errorMessage = utilities_1.Utilities.findHttpResponseMessage('error_description', error);
                if (errorMessage)
                    _this.alertService.showStickyMessage('Unable to login', errorMessage, alert_service_1.MessageSeverity.error, error);
                else
                    _this.alertService.showStickyMessage('Unable to login', 'An error occured whilst logging in, please try again later.\nError: ' + utilities_1.Utilities.getResponseBody(error), alert_service_1.MessageSeverity.error, error);
            }
            setTimeout(function () {
                _this.isLoading = false;
            }, 500);
        });
    };
    LoginComponent.prototype.offerAlternateHost = function () {
        var _this = this;
        if (utilities_1.Utilities.checkIsLocalHost(location.origin) && utilities_1.Utilities.checkIsLocalHost(this.configurations.baseUrl)) {
            this.alertService.showDialog('Dear Developer!\nIt appears your backend Web API service is not running...\n' +
                'Would you want to temporarily switch to the online Demo API below?(Or specify another)', alert_service_1.DialogType.prompt, function (value) {
                _this.configurations.baseUrl = value;
                _this.alertService.showStickyMessage('API Changed!', 'The target Web API has been changed to: ' + value, alert_service_1.MessageSeverity.warn);
            }, null, null, null, this.configurations.fallbackBaseUrl);
        }
    };
    LoginComponent.prototype.reset = function () {
        var _this = this;
        this.formResetToggle = false;
        setTimeout(function () {
            _this.formResetToggle = true;
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [alert_service_1.AlertService, auth_service_1.AuthService, configuration_service_1.ConfigurationService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map