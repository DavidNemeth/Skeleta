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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var auth_service_1 = require("./auth.service");
var notification_endpoint_service_1 = require("./notification-endpoint.service");
var notification_model_1 = require("../models/notification.model");
var NotificationService = /** @class */ (function () {
    function NotificationService(notificationEndpoint, authService) {
        this.notificationEndpoint = notificationEndpoint;
        this.authService = authService;
    }
    Object.defineProperty(NotificationService.prototype, "recentNotifications", {
        get: function () {
            return this._recentNotifications;
        },
        set: function (notifications) {
            this._recentNotifications = notifications;
        },
        enumerable: true,
        configurable: true
    });
    NotificationService.prototype.getNotification = function (notificationId) {
        return this.notificationEndpoint.getNotificationEndpoint(notificationId).pipe(operators_1.map(function (response) { return notification_model_1.Notification.Create(response); }));
    };
    NotificationService.prototype.getNotifications = function (page, pageSize) {
        var _this = this;
        return this.notificationEndpoint.getNotificationsEndpoint(page, pageSize).pipe(operators_1.map(function (response) {
            return _this.getNotificationsFromResponse(response);
        }));
    };
    NotificationService.prototype.getUnreadNotifications = function (userId) {
        var _this = this;
        return this.notificationEndpoint.getUnreadNotificationsEndpoint(userId).pipe(operators_1.map(function (response) { return _this.getNotificationsFromResponse(response); }));
    };
    NotificationService.prototype.getNewNotifications = function () {
        var _this = this;
        return this.notificationEndpoint.getNewNotificationsEndpoint(this.lastNotificationDate).pipe(operators_1.map(function (response) { return _this.processNewNotificationsFromResponse(response); }));
    };
    NotificationService.prototype.getNewNotificationsPeriodically = function () {
        var _this = this;
        return rxjs_1.interval(10000).pipe(operators_1.startWith(0), operators_1.flatMap(function () {
            return _this.notificationEndpoint.getNewNotificationsEndpoint(_this.lastNotificationDate).pipe(operators_1.map(function (response) { return _this.processNewNotificationsFromResponse(response); }));
        }));
    };
    NotificationService.prototype.pinUnpinNotification = function (notificationOrNotificationId, isPinned) {
        if (typeof notificationOrNotificationId === 'number' || notificationOrNotificationId instanceof Number) {
            return this.notificationEndpoint.getPinUnpinNotificationEndpoint(notificationOrNotificationId, isPinned);
        }
        else {
            return this.pinUnpinNotification(notificationOrNotificationId.id);
        }
    };
    NotificationService.prototype.readUnreadNotification = function (notificationIds, isRead) {
        return this.notificationEndpoint.getReadUnreadNotificationEndpoint(notificationIds, isRead);
    };
    NotificationService.prototype.deleteNotification = function (notificationOrNotificationId) {
        var _this = this;
        if (typeof notificationOrNotificationId === 'number' || notificationOrNotificationId instanceof Number) {
            return this.notificationEndpoint.getDeleteNotificationEndpoint(notificationOrNotificationId).pipe(operators_1.map(function (response) {
                _this.recentNotifications = _this.recentNotifications.filter(function (n) { return n.id !== notificationOrNotificationId; });
                return notification_model_1.Notification.Create(response);
            }));
        }
        else {
            return this.deleteNotification(notificationOrNotificationId.id);
        }
    };
    NotificationService.prototype.processNewNotificationsFromResponse = function (response) {
        var notifications = this.getNotificationsFromResponse(response);
        for (var _i = 0, notifications_1 = notifications; _i < notifications_1.length; _i++) {
            var n = notifications_1[_i];
            if (n.date > this.lastNotificationDate) {
                this.lastNotificationDate = n.date;
            }
        }
        return notifications;
    };
    NotificationService.prototype.getNotificationsFromResponse = function (response) {
        var notifications = [];
        for (var i in response) {
            if (response.hasOwnProperty(i)) {
                notifications[i] = notification_model_1.Notification.Create(response[i]);
            }
        }
        notifications.sort(function (a, b) { return b.date.valueOf() - a.date.valueOf(); });
        notifications.sort(function (a, b) { return (a.isPinned === b.isPinned) ? 0 : a.isPinned ? -1 : 1; });
        this.recentNotifications = notifications;
        return notifications;
    };
    Object.defineProperty(NotificationService.prototype, "currentUser", {
        get: function () {
            return this.authService.currentUser;
        },
        enumerable: true,
        configurable: true
    });
    NotificationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [notification_endpoint_service_1.NotificationEndpoint, auth_service_1.AuthService])
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map