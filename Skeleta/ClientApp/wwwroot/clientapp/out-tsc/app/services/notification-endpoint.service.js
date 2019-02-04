"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var NotificationEndpoint = /** @class */ (function () {
    function NotificationEndpoint() {
        this.demoNotifications = [
            {
                'id': 1,
                'header': '20 New Products were added to your inventory by "administrator"',
                'body': '20 new "BMW M6" were added to your stock by "administrator" on 5/28/2017 4:54:13 PM',
                'isRead': true,
                'isPinned': true,
                'date': '2017-05-28T16:29:13.5877958'
            },
            {
                'id': 2,
                'header': '1 Product running low',
                'body': 'You are running low on "Nissan Patrol". 2 Items remaining',
                'isRead': false,
                'isPinned': false,
                'date': '2017-05-28T19:54:42.4144502'
            },
            {
                'id': 3,
                'header': 'Tomorrow is half day',
                'body': 'Guys, tomorrow we close by midday. Please check in your sales before noon. Thanx. Alex.',
                'isRead': false,
                'isPinned': false,
                'date': '2017-05-30T11:13:42.4144502'
            }
        ];
    }
    NotificationEndpoint.prototype.getNotificationEndpoint = function (notificationId) {
        var notification = this.demoNotifications.find(function (val) { return val.id == notificationId; });
        var response;
        if (notification) {
            response = this.createResponse(notification, 200);
        }
        else {
            response = this.createResponse(null, 404);
        }
        return rxjs_1.of(response.body);
    };
    NotificationEndpoint.prototype.getNotificationsEndpoint = function (page, pageSize) {
        var notifications = this.demoNotifications;
        var response = this.createResponse(this.demoNotifications, 200);
        return rxjs_1.of(response.body);
    };
    NotificationEndpoint.prototype.getUnreadNotificationsEndpoint = function (userId) {
        var unreadNotifications = this.demoNotifications.filter(function (val) { return !val.isRead; });
        var response = this.createResponse(unreadNotifications, 200);
        return rxjs_1.of(response.body);
    };
    NotificationEndpoint.prototype.getNewNotificationsEndpoint = function (lastNotificationDate) {
        var unreadNotifications = this.demoNotifications;
        var response = this.createResponse(unreadNotifications, 200);
        return rxjs_1.of(response.body);
    };
    NotificationEndpoint.prototype.getPinUnpinNotificationEndpoint = function (notificationId, isPinned) {
        var notification = this.demoNotifications.find(function (val) { return val.id == notificationId; });
        var response;
        if (notification) {
            response = this.createResponse(null, 204);
            if (isPinned == null)
                isPinned = !notification.isPinned;
            notification.isPinned = isPinned;
            notification.isRead = true;
        }
        else {
            response = this.createResponse(null, 404);
        }
        return rxjs_1.of(response.body);
    };
    NotificationEndpoint.prototype.getReadUnreadNotificationEndpoint = function (notificationIds, isRead) {
        var _loop_1 = function (notificationId) {
            var notification = this_1.demoNotifications.find(function (val) { return val.id == notificationId; });
            if (notification) {
                notification.isRead = isRead;
            }
        };
        var this_1 = this;
        for (var _i = 0, notificationIds_1 = notificationIds; _i < notificationIds_1.length; _i++) {
            var notificationId = notificationIds_1[_i];
            _loop_1(notificationId);
        }
        var response = this.createResponse(null, 204);
        return rxjs_1.of(response.body);
    };
    NotificationEndpoint.prototype.getDeleteNotificationEndpoint = function (notificationId) {
        var notification = this.demoNotifications.find(function (val) { return val.id == notificationId; });
        var response;
        if (notification) {
            this.demoNotifications = this.demoNotifications.filter(function (val) { return val.id != notificationId; });
            response = this.createResponse(notification, 200);
        }
        else {
            response = this.createResponse(null, 404);
        }
        return rxjs_1.of(response.body);
    };
    NotificationEndpoint.prototype.createResponse = function (body, status) {
        return new http_1.HttpResponse({ body: body, status: status });
    };
    NotificationEndpoint = __decorate([
        core_1.Injectable()
    ], NotificationEndpoint);
    return NotificationEndpoint;
}());
exports.NotificationEndpoint = NotificationEndpoint;
//# sourceMappingURL=notification-endpoint.service.js.map