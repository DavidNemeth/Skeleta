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
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var smart_dashboard_component_1 = require("./components/dashboard/smart-dashboard/smart-dashboard.component");
var smart_settings_component_1 = require("./components/settings/smart-settings/smart-settings.component");
var user_management_component_1 = require("./components/admin/user-management/user-management.component");
var role_management_component_1 = require("./components/admin/role-management/role-management.component");
var user_info_component_1 = require("./components/settings/user-info/user-info.component");
var user_preferences_component_1 = require("./components/settings/user-preferences/user-preferences.component");
var smart_admin_component_1 = require("./components/admin/smart-admin/smart-admin.component");
var admin_component_1 = require("./components/admin/admin.component");
var task_management_component_1 = require("./components/admin/task-management/task-management.component");
var tasks_component_1 = require("./components/tasks/tasks.component");
var bugitems_component_1 = require("./components/tasks/bugitems/bugitems.component");
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
        ]
    },
    {
        path: 'admin', component: admin_component_1.AdminComponent, canActivate: [auth_guard_service_1.AuthGuard], data: { title: 'Settings' }, children: [
            { path: '', component: smart_admin_component_1.SmartAdminComponent, data: { title: 'Smart Panel' } },
            { path: 'users', component: user_management_component_1.UserManagementComponent, data: { title: 'Users' } },
            { path: 'roles', component: role_management_component_1.RoleManagementComponent, data: { title: 'Roles' } },
            { path: 'tasks', component: task_management_component_1.TaskManagementComponent, data: { title: 'Tasks' } }
        ]
    },
    {
        path: 'tasks', component: tasks_component_1.TasksComponent, canActivate: [auth_guard_service_1.AuthGuard], data: { title: 'Settings' }, children: [
            { path: '', component: smart_admin_component_1.SmartAdminComponent, data: { title: 'Smart Panel' } },
            { path: 'tasks', component: task_management_component_1.TaskManagementComponent, data: { title: 'Tasks' } },
            { path: 'bugs', component: bugitems_component_1.BugitemsComponent, data: { title: 'Bugs' } }
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