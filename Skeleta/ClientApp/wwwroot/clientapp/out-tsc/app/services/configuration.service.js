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
var app_translation_service_1 = require("./app-translation.service");
var local_store_manager_service_1 = require("./local-store-manager.service");
var db_Keys_1 = require("./db-Keys");
var utilities_1 = require("./utilities");
var environment_1 = require("../../environments/environment");
var ConfigurationService = /** @class */ (function () {
    function ConfigurationService(localStorage, translationService) {
        this.localStorage = localStorage;
        this.translationService = translationService;
        // ***End of defaults***
        this.baseUrl = environment_1.environment.baseUrl || utilities_1.Utilities.baseUrl();
        this.loginUrl = environment_1.environment.loginUrl;
        this.fallbackBaseUrl = '/fallbackUrl';
        this._language = null;
        this._homeUrl = null;
        this._theme = null;
        this._showDashboardStatistics = null;
        this._showDashboardNotifications = null;
        this._showDashboardTodo = null;
        this._showDashboardBanner = null;
        this.loadLocalChanges();
    }
    ConfigurationService_1 = ConfigurationService;
    Object.defineProperty(ConfigurationService.prototype, "language", {
        get: function () {
            if (this._language != null)
                return this._language;
            return ConfigurationService_1.defaultLanguage;
        },
        set: function (value) {
            this._language = value;
            this.saveToLocalStore(value, db_Keys_1.DBkeys.LANGUAGE);
            this.translationService.changeLanguage(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "homeUrl", {
        get: function () {
            if (this._homeUrl != null)
                return this._homeUrl;
            return ConfigurationService_1.defaultHomeUrl;
        },
        set: function (value) {
            this._homeUrl = value;
            this.saveToLocalStore(value, db_Keys_1.DBkeys.HOME_URL);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "theme", {
        get: function () {
            if (this._theme != null)
                return this._theme;
            return ConfigurationService_1.defaultTheme;
        },
        set: function (value) {
            this._theme = value;
            this.saveToLocalStore(value, db_Keys_1.DBkeys.THEME);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "showDashboardStatistics", {
        get: function () {
            if (this._showDashboardStatistics != null)
                return this._showDashboardStatistics;
            return ConfigurationService_1.defaultShowDashboardStatistics;
        },
        set: function (value) {
            this._showDashboardStatistics = value;
            this.saveToLocalStore(value, db_Keys_1.DBkeys.SHOW_DASHBOARD_STATISTICS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "showDashboardNotifications", {
        get: function () {
            if (this._showDashboardNotifications != null)
                return this._showDashboardNotifications;
            return ConfigurationService_1.defaultShowDashboardNotifications;
        },
        set: function (value) {
            this._showDashboardNotifications = value;
            this.saveToLocalStore(value, db_Keys_1.DBkeys.SHOW_DASHBOARD_NOTIFICATIONS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "showDashboardTodo", {
        get: function () {
            if (this._showDashboardTodo != null)
                return this._showDashboardTodo;
            return ConfigurationService_1.defaultShowDashboardTodo;
        },
        set: function (value) {
            this._showDashboardTodo = value;
            this.saveToLocalStore(value, db_Keys_1.DBkeys.SHOW_DASHBOARD_TODO);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "showDashboardBanner", {
        get: function () {
            if (this._showDashboardBanner != null)
                return this._showDashboardBanner;
            return ConfigurationService_1.defaultShowDashboardBanner;
        },
        set: function (value) {
            this._showDashboardBanner = value;
            this.saveToLocalStore(value, db_Keys_1.DBkeys.SHOW_DASHBOARD_BANNER);
        },
        enumerable: true,
        configurable: true
    });
    ConfigurationService.prototype.loadLocalChanges = function () {
        if (this.localStorage.exists(db_Keys_1.DBkeys.LANGUAGE)) {
            this._language = this.localStorage.getDataObject(db_Keys_1.DBkeys.LANGUAGE);
            this.translationService.changeLanguage(this._language);
        }
        else {
            this.resetLanguage();
        }
        if (this.localStorage.exists(db_Keys_1.DBkeys.HOME_URL))
            this._homeUrl = this.localStorage.getDataObject(db_Keys_1.DBkeys.HOME_URL);
        if (this.localStorage.exists(db_Keys_1.DBkeys.THEME))
            this._theme = this.localStorage.getDataObject(db_Keys_1.DBkeys.THEME);
        if (this.localStorage.exists(db_Keys_1.DBkeys.SHOW_DASHBOARD_STATISTICS))
            this._showDashboardStatistics = this.localStorage.getDataObject(db_Keys_1.DBkeys.SHOW_DASHBOARD_STATISTICS);
        if (this.localStorage.exists(db_Keys_1.DBkeys.SHOW_DASHBOARD_NOTIFICATIONS))
            this._showDashboardNotifications = this.localStorage.getDataObject(db_Keys_1.DBkeys.SHOW_DASHBOARD_NOTIFICATIONS);
        if (this.localStorage.exists(db_Keys_1.DBkeys.SHOW_DASHBOARD_TODO))
            this._showDashboardTodo = this.localStorage.getDataObject(db_Keys_1.DBkeys.SHOW_DASHBOARD_TODO);
        if (this.localStorage.exists(db_Keys_1.DBkeys.SHOW_DASHBOARD_BANNER))
            this._showDashboardBanner = this.localStorage.getDataObject(db_Keys_1.DBkeys.SHOW_DASHBOARD_BANNER);
    };
    ConfigurationService.prototype.saveToLocalStore = function (data, key) {
        var _this = this;
        setTimeout(function () { return _this.localStorage.savePermanentData(data, key); });
    };
    ConfigurationService.prototype.import = function (jsonValue) {
        this.clearLocalChanges();
        if (!jsonValue)
            return;
        var importValue = utilities_1.Utilities.JSonTryParse(jsonValue);
        if (importValue.language != null)
            this.language = importValue.language;
        if (importValue.homeUrl != null)
            this.homeUrl = importValue.homeUrl;
        if (importValue.theme != null)
            this.theme = importValue.theme;
        if (importValue.showDashboardStatistics != null)
            this.showDashboardStatistics = importValue.showDashboardStatistics;
        if (importValue.showDashboardNotifications != null)
            this.showDashboardNotifications = importValue.showDashboardNotifications;
        if (importValue.showDashboardTodo != null)
            this.showDashboardTodo = importValue.showDashboardTodo;
        if (importValue.showDashboardBanner != null)
            this.showDashboardBanner = importValue.showDashboardBanner;
    };
    ConfigurationService.prototype.export = function (changesOnly) {
        if (changesOnly === void 0) { changesOnly = true; }
        var exportValue = {
            language: changesOnly ? this._language : this.language,
            homeUrl: changesOnly ? this._homeUrl : this.homeUrl,
            theme: changesOnly ? this._theme : this.theme,
            showDashboardStatistics: changesOnly ? this._showDashboardStatistics : this.showDashboardStatistics,
            showDashboardNotifications: changesOnly ? this._showDashboardNotifications : this.showDashboardNotifications,
            showDashboardTodo: changesOnly ? this._showDashboardTodo : this.showDashboardTodo,
            showDashboardBanner: changesOnly ? this._showDashboardBanner : this.showDashboardBanner
        };
        return JSON.stringify(exportValue);
    };
    ConfigurationService.prototype.clearLocalChanges = function () {
        this._language = null;
        this._homeUrl = null;
        this._theme = null;
        this._showDashboardStatistics = null;
        this._showDashboardNotifications = null;
        this._showDashboardTodo = null;
        this._showDashboardBanner = null;
        this.localStorage.deleteData(db_Keys_1.DBkeys.LANGUAGE);
        this.localStorage.deleteData(db_Keys_1.DBkeys.HOME_URL);
        this.localStorage.deleteData(db_Keys_1.DBkeys.THEME);
        this.localStorage.deleteData(db_Keys_1.DBkeys.SHOW_DASHBOARD_STATISTICS);
        this.localStorage.deleteData(db_Keys_1.DBkeys.SHOW_DASHBOARD_NOTIFICATIONS);
        this.localStorage.deleteData(db_Keys_1.DBkeys.SHOW_DASHBOARD_TODO);
        this.localStorage.deleteData(db_Keys_1.DBkeys.SHOW_DASHBOARD_BANNER);
        this.resetLanguage();
    };
    ConfigurationService.prototype.resetLanguage = function () {
        var language = this.translationService.useBrowserLanguage();
        if (language) {
            this._language = language;
        }
        else {
            this._language = this.translationService.changeLanguage();
        }
    };
    var ConfigurationService_1;
    ConfigurationService.appVersion = '1.0.0';
    // ***Specify default configurations here***
    ConfigurationService.defaultLanguage = 'en';
    ConfigurationService.defaultHomeUrl = '/';
    ConfigurationService.defaultTheme = 'Default';
    ConfigurationService.defaultShowDashboardStatistics = true;
    ConfigurationService.defaultShowDashboardNotifications = true;
    ConfigurationService.defaultShowDashboardTodo = false;
    ConfigurationService.defaultShowDashboardBanner = true;
    ConfigurationService = ConfigurationService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [local_store_manager_service_1.LocalStoreManager, app_translation_service_1.AppTranslationService])
    ], ConfigurationService);
    return ConfigurationService;
}());
exports.ConfigurationService = ConfigurationService;
//# sourceMappingURL=configuration.service.js.map