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
var ngx_toasta_1 = require("ngx-toasta");
var alert_service_1 = require("../services/alert.service");
var notification_service_1 = require("../services/notification.service");
var account_service_1 = require("../services/account.service");
var local_store_manager_service_1 = require("../services/local-store-manager.service");
var auth_service_1 = require("../services/auth.service");
var configuration_service_1 = require("../services/configuration.service");
var app_title_service_1 = require("../services/app-title.service");
var app_translation_service_1 = require("../services/app-translation.service");
var alertify = require('../assets/scripts/alertify.js');
var AppComponent = /** @class */ (function () {
    function AppComponent(storageManager, toastaService, toastaConfig, router, accountService, alertService, notificationService, appTitleService, authService, translationService, configurations) {
        this.toastaService = toastaService;
        this.toastaConfig = toastaConfig;
        this.router = router;
        this.accountService = accountService;
        this.alertService = alertService;
        this.notificationService = notificationService;
        this.appTitleService = appTitleService;
        this.authService = authService;
        this.translationService = translationService;
        this.configurations = configurations;
        this.newNotificationCount = 0;
        this.appTitle = 'Skeleta Application';
        this.stickyToasties = [];
        this.dataLoadingConsecutiveFailurs = 0;
        storageManager.initialiseStorageSyncListener();
        translationService.addLanguages(['en', 'hu']);
        translationService.setDefaultLanguage('en');
        translationService.changeLanguage('hu');
        this.toastaConfig.theme = 'material';
        this.toastaConfig.position = 'top-right';
        this.toastaConfig.limit = 100;
        this.toastaConfig.showClose = true;
        this.appTitleService.appName = this.appTitle;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // 1 sec to ensure all the effort to get the css animation working is appreciated :|, Preboot screen is removed .5 sec later
        setTimeout(function () { return _this.isAppLoaded = true; }, 10);
        setTimeout(function () { return _this.removePrebootScreen = true; }, 15);
        this.collapsed = true;
        setTimeout(function () {
            if (_this.isUserLoggedIn) {
                _this.alertService.resetStickyMessage();
                // if (!this.authService.isSessionExpired)
                _this.alertService.showMessage('Login', "Welcome back " + _this.userName + "!", alert_service_1.MessageSeverity.default);
                // else
                //    this.alertService.showStickyMessage("Session Expired", "Your Session has expired. Please log in again", MessageSeverity.warn);
            }
        }, 2000);
        this.alertService.getDialogEvent().subscribe(function (alert) { return _this.showDialog(alert); });
        this.alertService.getMessageEvent().subscribe(function (message) { return _this.showToast(message, false); });
        this.alertService.getStickyMessageEvent().subscribe(function (message) { return _this.showToast(message, true); });
        this.authService.reLoginDelegate = function () { return _this.shouldShowLogin = true; };
        this.authService.getLoginStatusEvent().subscribe(function (isLoggedIn) {
            _this.isUserLoggedIn = isLoggedIn;
            if (_this.isUserLoggedIn) {
                _this.initNotificationsLoading();
            }
            else {
                _this.unsubscribeNotifications();
            }
            setTimeout(function () {
                if (!_this.isUserLoggedIn) {
                    _this.alertService.showMessage('Session Ended!', '', alert_service_1.MessageSeverity.default);
                }
            }, 500);
        });
        this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                var url = event.url;
                if (url !== url.toLowerCase()) {
                    _this.router.navigateByUrl(event.url.toLowerCase());
                }
            }
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.unsubscribeNotifications();
    };
    AppComponent.prototype.unsubscribeNotifications = function () {
        if (this.notificationsLoadingSubscription)
            this.notificationsLoadingSubscription.unsubscribe();
    };
    AppComponent.prototype.initNotificationsLoading = function () {
        var _this = this;
        this.notificationsLoadingSubscription = this.notificationService.getNewNotificationsPeriodically()
            .subscribe(function (notifications) {
            _this.dataLoadingConsecutiveFailurs = 0;
            _this.newNotificationCount = notifications.filter(function (n) { return !n.isRead; }).length;
        }, function (error) {
            _this.alertService.logError(error);
            if (_this.dataLoadingConsecutiveFailurs++ < 20)
                setTimeout(function () { return _this.initNotificationsLoading(); }, 5000);
            else
                _this.alertService.showStickyMessage('Load Error', 'Loading new notifications from the server failed!', alert_service_1.MessageSeverity.error);
        });
    };
    AppComponent.prototype.markNotificationsAsRead = function () {
        var _this = this;
        var recentNotifications = this.notificationService.recentNotifications;
        if (recentNotifications.length) {
            this.notificationService.readUnreadNotification(recentNotifications.map(function (n) { return n.id; }), true)
                .subscribe(function (response) {
                for (var _i = 0, recentNotifications_1 = recentNotifications; _i < recentNotifications_1.length; _i++) {
                    var n = recentNotifications_1[_i];
                    n.isRead = true;
                }
                _this.newNotificationCount = recentNotifications.filter(function (n) { return !n.isRead; }).length;
            }, function (error) {
                _this.alertService.logError(error);
                _this.alertService.showMessage('Notification Error', 'Marking read notifications failed', alert_service_1.MessageSeverity.error);
            });
        }
    };
    AppComponent.prototype.showDialog = function (dialog) {
        alertify.set({
            labels: {
                ok: dialog.okLabel || 'OK',
                cancel: dialog.cancelLabel || 'Cancel'
            }
        });
        switch (dialog.type) {
            case alert_service_1.DialogType.alert:
                alertify.alert(dialog.message);
                break;
            case alert_service_1.DialogType.confirm:
                alertify
                    .confirm(dialog.message, function (e) {
                    if (e) {
                        dialog.okCallback();
                    }
                    else {
                        if (dialog.cancelCallback)
                            dialog.cancelCallback();
                    }
                });
                break;
            case alert_service_1.DialogType.prompt:
                alertify
                    .prompt(dialog.message, function (e, val) {
                    if (e) {
                        dialog.okCallback(val);
                    }
                    else {
                        if (dialog.cancelCallback)
                            dialog.cancelCallback();
                    }
                }, dialog.defaultValue);
                break;
        }
    };
    AppComponent.prototype.showToast = function (message, isSticky) {
        var _this = this;
        if (message == null) {
            for (var _i = 0, _a = this.stickyToasties.slice(0); _i < _a.length; _i++) {
                var id = _a[_i];
                this.toastaService.clear(id);
            }
            return;
        }
        var toastOptions = {
            title: message.summary,
            msg: message.detail,
            timeout: isSticky ? 0 : 4000
        };
        if (isSticky) {
            toastOptions.onAdd = function (toast) { return _this.stickyToasties.push(toast.id); };
            toastOptions.onRemove = function (toast) {
                var index = _this.stickyToasties.indexOf(toast.id, 0);
                if (index > -1) {
                    _this.stickyToasties.splice(index, 1);
                }
                toast.onAdd = null;
                toast.onRemove = null;
            };
        }
        switch (message.severity) {
            case alert_service_1.MessageSeverity.default:
                this.toastaService.default(toastOptions);
                break;
            case alert_service_1.MessageSeverity.info:
                this.toastaService.info(toastOptions);
                break;
            case alert_service_1.MessageSeverity.success:
                this.toastaService.success(toastOptions);
                break;
            case alert_service_1.MessageSeverity.error:
                this.toastaService.error(toastOptions);
                break;
            case alert_service_1.MessageSeverity.warn:
                this.toastaService.warning(toastOptions);
                break;
            case alert_service_1.MessageSeverity.wait:
                this.toastaService.wait(toastOptions);
                break;
        }
    };
    AppComponent.prototype.logout = function () {
        this.authService.logout();
        this.authService.redirectLogoutUser();
    };
    AppComponent.prototype.getYear = function () {
        return new Date().getUTCFullYear();
    };
    Object.defineProperty(AppComponent.prototype, "userName", {
        get: function () {
            return this.authService.currentUser ? this.authService.currentUser.userName : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "userEmail", {
        get: function () {
            return this.authService.currentUser ? this.authService.currentUser.email : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "fullName", {
        get: function () {
            return this.authService.currentUser ? this.authService.currentUser.fullName : '';
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.over = function (value) {
        this.collapsed = value;
        console.log(this.shouldShowLogin);
    };
    AppComponent.prototype.onLoginShown = function () {
        this.alertService.showStickyMessage('Session Expired', 'Your Session has expired. Please log in again', alert_service_1.MessageSeverity.info);
    };
    AppComponent.prototype.onLoginHidden = function () {
        this.alertService.resetStickyMessage();
        this.loginControl.reset();
        this.shouldShowLogin = false;
        if (this.authService.isSessionExpired) {
            this.alertService.showStickyMessage('Session Expired', 'Your Session has expired. Please log in again to renew your session', alert_service_1.MessageSeverity.warn);
        }
    };
    AppComponent.prototype.onLoginHide = function () {
        this.alertService.resetStickyMessage();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [local_store_manager_service_1.LocalStoreManager, ngx_toasta_1.ToastaService,
            ngx_toasta_1.ToastaConfig,
            router_1.Router, account_service_1.AccountService,
            alert_service_1.AlertService, notification_service_1.NotificationService,
            app_title_service_1.AppTitleService, auth_service_1.AuthService,
            app_translation_service_1.AppTranslationService, configuration_service_1.ConfigurationService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map