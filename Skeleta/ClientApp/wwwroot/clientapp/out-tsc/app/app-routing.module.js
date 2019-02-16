"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_component_1 = require("./components/login/login.component");
var home_component_1 = require("./components/home/home.component");
var auth_service_1 = require("./services/auth.service");
var auth_guard_service_1 = require("./services/auth-guard.service");
var settings_component_1 = require("./components/settings/settings.component");
var shiftschart_component_1 = require("./components/controls/charts/shiftschart/shiftschart.component");
var machinechart_component_1 = require("./components/controls/charts/machinechart/machinechart.component");
var fusion_component_1 = require("./components/controls/charts/fusion/fusion.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var smart_dashboard_component_1 = require("./components/dashboard/smart-dashboard/smart-dashboard.component");
var smart_settings_component_1 = require("./components/settings/smart-settings/smart-settings.component");
var user_management_component_1 = require("./components/admin/user-management/user-management.component");
var role_management_component_1 = require("./components/admin/role-management/role-management.component");
var user_info_component_1 = require("./components/settings/user-info/user-info.component");
var user_preferences_component_1 = require("./components/settings/user-preferences/user-preferences.component");
var smart_admin_component_1 = require("./components/admin/smart-admin/smart-admin.component");
var admin_component_1 = require("./components/admin/admin.component");
var routes = [
    { path: '', component: home_component_1.HomeComponent, canActivate: [auth_guard_service_1.AuthGuard], data: { title: 'Home' } },
    { path: 'login', component: login_component_1.LoginComponent, data: { title: 'Login' } },
    { path: 'home', redirectTo: '/', pathMatch: 'full', data: { title: 'Home' } },
    {
        path: 'settings', component: settings_component_1.SettingsComponent, canActivate: [auth_guard_service_1.AuthGuard], data: { title: 'Settings' }, children: [
            { path: '', component: smart_settings_component_1.SmartSettingsComponent, data: { title: 'Settings' } },
            { path: 'profile', component: user_info_component_1.UserInfoComponent, data: { title: 'Profile' } },
            { path: 'preferences', component: user_preferences_component_1.UserPreferencesComponent, data: { title: 'Profile' } }
        ]
    },
    {
        path: 'dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [auth_guard_service_1.AuthGuard], data: { title: 'Dashboard' }, children: [
            { path: '', component: smart_dashboard_component_1.SmartDashboardComponent, data: { title: 'Smart Panel' } },
            { path: 'machinechart', component: machinechart_component_1.MachinechartComponent, data: { title: 'Machine Breakdown' } },
            { path: 'fusionchart', component: fusion_component_1.FusionComponent, data: { title: 'Fusion Chart' } },
            { path: 'shiftchart', component: shiftschart_component_1.ShiftschartComponent, data: { title: 'Shift Assignment' } }
        ]
    },
    {
        path: 'admin', component: admin_component_1.AdminComponent, canActivate: [auth_guard_service_1.AuthGuard], data: { title: 'Settings' }, children: [
            { path: '', component: smart_admin_component_1.SmartAdminComponent, data: { title: 'Smart Panel' } },
            { path: 'users', component: user_management_component_1.UserManagementComponent, data: { title: 'Users' } },
            { path: 'roles', component: role_management_component_1.RoleManagementComponent, data: { title: 'Roles' } }
        ]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule],
            providers: [auth_service_1.AuthService, auth_guard_service_1.AuthGuard]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map