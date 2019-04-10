"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DBkeys = /** @class */ (function () {
    function DBkeys() {
    }
    DBkeys.CURRENT_USER = 'current_user';
    DBkeys.USER_PERMISSIONS = 'user_permissions';
    DBkeys.ACCESS_TOKEN = 'access_token';
    DBkeys.ID_TOKEN = 'id_token';
    DBkeys.REFRESH_TOKEN = 'refresh_token';
    DBkeys.TOKEN_EXPIRES_IN = 'expires_in';
    DBkeys.REMEMBER_ME = 'remember_me';
    DBkeys.LANGUAGE = 'language';
    DBkeys.HOME_URL = 'home_url';
    DBkeys.THEME = 'theme';
    DBkeys.SHOW_DASHBOARD_STATISTICS = 'show_dashboard_statistics';
    DBkeys.SHOW_DASHBOARD_NOTIFICATIONS = 'show_dashboard_notifications';
    DBkeys.SHOW_DASHBOARD_BANNER = 'show_dashboard_banner';
    DBkeys.SHOW_USER_MANAGEMENT = 'show_user_management';
    DBkeys.SHOW_ROLE_MANAGEMENT = 'show_role_management';
    DBkeys.SHOW_DASHBOARD_TASK = 'show_dashboard_task';
    DBkeys = __decorate([
        core_1.Injectable()
    ], DBkeys);
    return DBkeys;
}());
exports.DBkeys = DBkeys;
//# sourceMappingURL=db-Keys.js.map