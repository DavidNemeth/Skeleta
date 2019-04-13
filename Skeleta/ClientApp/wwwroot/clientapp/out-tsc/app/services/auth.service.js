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
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var local_store_manager_service_1 = require("./local-store-manager.service");
var endpoint_factory_service_1 = require("./endpoint-factory.service");
var configuration_service_1 = require("./configuration.service");
var db_Keys_1 = require("./db-Keys");
var jwt_helper_1 = require("./jwt-helper");
var utilities_1 = require("./utilities");
var user_model_1 = require("../models/user.model");
var AuthService = /** @class */ (function () {
    function AuthService(router, configurations, endpointFactory, localStorage) {
        this.router = router;
        this.configurations = configurations;
        this.endpointFactory = endpointFactory;
        this.localStorage = localStorage;
        this.previousIsLoggedInCheck = false;
        this._loginStatus = new rxjs_1.Subject();
        this.initializeLoginStatus();
    }
    Object.defineProperty(AuthService.prototype, "loginUrl", {
        get: function () { return this.configurations.loginUrl; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "homeUrl", {
        get: function () { return this.configurations.homeUrl; },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.initializeLoginStatus = function () {
        var _this = this;
        this.localStorage.getInitEvent().subscribe(function () {
            _this.reevaluateLoginStatus();
        });
    };
    AuthService.prototype.gotoPage = function (page, preserveParams) {
        if (preserveParams === void 0) { preserveParams = true; }
        var navigationExtras = {
            queryParamsHandling: preserveParams ? 'merge' : '', preserveFragment: preserveParams
        };
        this.router.navigate([page], navigationExtras);
    };
    AuthService.prototype.redirectLoginUser = function () {
        var redirect = this.loginRedirectUrl &&
            this.loginRedirectUrl !== '/' && this.loginRedirectUrl !== configuration_service_1.ConfigurationService.defaultHomeUrl ?
            this.loginRedirectUrl : this.homeUrl;
        this.loginRedirectUrl = null;
        var urlParamsAndFragment = utilities_1.Utilities.splitInTwo(redirect, '#');
        var urlAndParams = utilities_1.Utilities.splitInTwo(urlParamsAndFragment.firstPart, '?');
        var navigationExtras = {
            fragment: urlParamsAndFragment.secondPart,
            queryParams: utilities_1.Utilities.getQueryParamsFromString(urlAndParams.secondPart),
            queryParamsHandling: 'merge'
        };
        this.router.navigate([urlAndParams.firstPart], navigationExtras);
    };
    AuthService.prototype.redirectLogoutUser = function () {
        var redirect = this.logoutRedirectUrl ? this.logoutRedirectUrl : this.loginUrl;
        this.logoutRedirectUrl = null;
        this.router.navigate([redirect]);
    };
    AuthService.prototype.redirectForLogin = function () {
        this.loginRedirectUrl = this.router.url;
        this.router.navigate([this.loginUrl]);
    };
    AuthService.prototype.reLogin = function () {
        this.localStorage.deleteData(db_Keys_1.DBkeys.TOKEN_EXPIRES_IN);
        if (this.reLoginDelegate) {
            this.reLoginDelegate();
        }
        else {
            this.redirectForLogin();
        }
    };
    AuthService.prototype.refreshLogin = function () {
        var _this = this;
        return this.endpointFactory.getRefreshLoginEndpoint().pipe(operators_1.map(function (response) { return _this.processLoginResponse(response, _this.rememberMe); }));
    };
    AuthService.prototype.login = function (userName, password, rememberMe) {
        var _this = this;
        if (this.isLoggedIn) {
            this.logout();
        }
        return this.endpointFactory.getLoginEndpoint(userName, password).pipe(operators_1.map(function (response) { return _this.processLoginResponse(response, rememberMe); }));
    };
    AuthService.prototype.processLoginResponse = function (response, rememberMe) {
        var accessToken = response.access_token;
        if (accessToken == null) {
            throw new Error('Received accessToken was empty');
        }
        var idToken = response.id_token;
        var refreshToken = response.refresh_token || this.refreshToken;
        var expiresIn = response.expires_in;
        var tokenExpiryDate = new Date();
        tokenExpiryDate.setSeconds(tokenExpiryDate.getSeconds() + expiresIn);
        var accessTokenExpiry = tokenExpiryDate;
        var jwtHelper = new jwt_helper_1.JwtHelper();
        var decodedIdToken = jwtHelper.decodeToken(response.id_token);
        var permissions = Array.isArray(decodedIdToken.permission) ? decodedIdToken.permission :
            [decodedIdToken.permission];
        if (!this.isLoggedIn) {
            this.configurations.import(decodedIdToken.configuration);
        }
        var user = new user_model_1.User(decodedIdToken.sub, decodedIdToken.name, decodedIdToken.fullname, decodedIdToken.email, decodedIdToken.jobtitle, decodedIdToken.phone, Array.isArray(decodedIdToken.role) ? decodedIdToken.role : [decodedIdToken.role]);
        user.isEnabled = true;
        this.saveUserDetails(user, permissions, accessToken, idToken, refreshToken, accessTokenExpiry, rememberMe);
        this.reevaluateLoginStatus(user);
        return user;
    };
    AuthService.prototype.saveUserDetails = function (user, permissions, accessToken, idToken, refreshToken, expiresIn, rememberMe) {
        if (rememberMe) {
            this.localStorage.savePermanentData(accessToken, db_Keys_1.DBkeys.ACCESS_TOKEN);
            this.localStorage.savePermanentData(idToken, db_Keys_1.DBkeys.ID_TOKEN);
            this.localStorage.savePermanentData(refreshToken, db_Keys_1.DBkeys.REFRESH_TOKEN);
            this.localStorage.savePermanentData(expiresIn, db_Keys_1.DBkeys.TOKEN_EXPIRES_IN);
            this.localStorage.savePermanentData(permissions, db_Keys_1.DBkeys.USER_PERMISSIONS);
            this.localStorage.savePermanentData(user, db_Keys_1.DBkeys.CURRENT_USER);
        }
        else {
            this.localStorage.saveSyncedSessionData(accessToken, db_Keys_1.DBkeys.ACCESS_TOKEN);
            this.localStorage.saveSyncedSessionData(idToken, db_Keys_1.DBkeys.ID_TOKEN);
            this.localStorage.saveSyncedSessionData(refreshToken, db_Keys_1.DBkeys.REFRESH_TOKEN);
            this.localStorage.saveSyncedSessionData(expiresIn, db_Keys_1.DBkeys.TOKEN_EXPIRES_IN);
            this.localStorage.saveSyncedSessionData(permissions, db_Keys_1.DBkeys.USER_PERMISSIONS);
            this.localStorage.saveSyncedSessionData(user, db_Keys_1.DBkeys.CURRENT_USER);
        }
        this.localStorage.savePermanentData(rememberMe, db_Keys_1.DBkeys.REMEMBER_ME);
    };
    AuthService.prototype.logout = function () {
        this.localStorage.deleteData(db_Keys_1.DBkeys.ACCESS_TOKEN);
        this.localStorage.deleteData(db_Keys_1.DBkeys.ID_TOKEN);
        this.localStorage.deleteData(db_Keys_1.DBkeys.REFRESH_TOKEN);
        this.localStorage.deleteData(db_Keys_1.DBkeys.TOKEN_EXPIRES_IN);
        this.localStorage.deleteData(db_Keys_1.DBkeys.USER_PERMISSIONS);
        this.localStorage.deleteData(db_Keys_1.DBkeys.CURRENT_USER);
        this.configurations.clearLocalChanges();
        this.reevaluateLoginStatus();
    };
    AuthService.prototype.reevaluateLoginStatus = function (currentUser) {
        var _this = this;
        var user = currentUser || this.localStorage.getDataObject(db_Keys_1.DBkeys.CURRENT_USER);
        var isLoggedIn = user !== null;
        if (this.previousIsLoggedInCheck !== isLoggedIn) {
            setTimeout(function () {
                _this._loginStatus.next(isLoggedIn);
            });
        }
        this.previousIsLoggedInCheck = isLoggedIn;
    };
    AuthService.prototype.getLoginStatusEvent = function () {
        return this._loginStatus.asObservable();
    };
    Object.defineProperty(AuthService.prototype, "currentUser", {
        get: function () {
            var user = this.localStorage.getDataObject(db_Keys_1.DBkeys.CURRENT_USER);
            this.reevaluateLoginStatus(user);
            return user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "userPermissions", {
        get: function () {
            return this.localStorage.getDataObject(db_Keys_1.DBkeys.USER_PERMISSIONS) || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "accessToken", {
        get: function () {
            this.reevaluateLoginStatus();
            return this.localStorage.getData(db_Keys_1.DBkeys.ACCESS_TOKEN);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "accessTokenExpiryDate", {
        get: function () {
            this.reevaluateLoginStatus();
            return this.localStorage.getDataObject(db_Keys_1.DBkeys.TOKEN_EXPIRES_IN, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "isSessionExpired", {
        get: function () {
            if (this.accessTokenExpiryDate == null) {
                return true;
            }
            return !(this.accessTokenExpiryDate.valueOf() > new Date().valueOf());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "idToken", {
        get: function () {
            this.reevaluateLoginStatus();
            return this.localStorage.getData(db_Keys_1.DBkeys.ID_TOKEN);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "refreshToken", {
        get: function () {
            this.reevaluateLoginStatus();
            return this.localStorage.getData(db_Keys_1.DBkeys.REFRESH_TOKEN);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "isLoggedIn", {
        get: function () {
            return this.currentUser != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "rememberMe", {
        get: function () {
            return this.localStorage.getDataObject(db_Keys_1.DBkeys.REMEMBER_ME) === true;
        },
        enumerable: true,
        configurable: true
    });
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, configuration_service_1.ConfigurationService, endpoint_factory_service_1.EndpointFactory,
            local_store_manager_service_1.LocalStoreManager])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map