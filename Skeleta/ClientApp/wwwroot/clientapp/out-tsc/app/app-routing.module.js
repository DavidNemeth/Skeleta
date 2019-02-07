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
var shiftschart_component_1 = require("./components/charts/shiftschart/shiftschart.component");
var machinechart_component_1 = require("./components/charts/machinechart/machinechart.component");
var fusion_component_1 = require("./components/fusion/fusion.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var routes = [
    { path: '', component: home_component_1.HomeComponent, canActivate: [auth_guard_service_1.AuthGuard], data: { title: 'Home' } },
    { path: 'login', component: login_component_1.LoginComponent, data: { title: 'Login' } },
    { path: 'home', redirectTo: '/', pathMatch: 'full' },
    { path: 'settings', component: settings_component_1.SettingsComponent, canActivate: [auth_guard_service_1.AuthGuard], data: { title: 'Settings' } },
    {
        path: 'dashboard', component: dashboard_component_1.DashboardComponent, data: { title: 'Dashboard' }, children: [
            { path: 'machinechart', component: machinechart_component_1.MachinechartComponent, data: { title: 'Machine Breakdown' } },
            { path: 'fusionchart', component: fusion_component_1.FusionComponent, data: { title: 'Fusion Chart' } },
            { path: 'shiftchart', component: shiftschart_component_1.ShiftschartComponent, data: { title: 'Shift Assignment' } }
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