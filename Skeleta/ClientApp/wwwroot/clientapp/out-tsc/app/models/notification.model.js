"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = require("../services/utilities");
var Notification = /** @class */ (function () {
    function Notification() {
    }
    Notification.Create = function (data) {
        var n = new Notification();
        Object.assign(n, data);
        if (n.date) {
            n.date = utilities_1.Utilities.parseDate(n.date);
        }
        return n;
    };
    return Notification;
}());
exports.Notification = Notification;
//# sourceMappingURL=notification.model.js.map