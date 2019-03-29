"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var http_1 = require("@angular/common/http");
var core_2 = require("@ngx-translate/core");
var ngx_toasta_1 = require("ngx-toasta");
var angular_1 = require("@clr/angular");
var ng_select_1 = require("@ng-select/ng-select");
var ngx_quill_1 = require("ngx-quill");
var angular_fusioncharts_1 = require("angular-fusioncharts");
var core_3 = require("fusioncharts/core");
var column2d_1 = require("fusioncharts/viz/column2d");
var stackedcolumn3dline_1 = require("fusioncharts/viz/stackedcolumn3dline");
var gantt_1 = require("fusioncharts/gantt");
var fusioncharts_theme_fusion_1 = require("fusioncharts/themes/es/fusioncharts.theme.fusion");
angular_fusioncharts_1.FusionChartsModule.fcRoot(core_3.default, column2d_1.default, stackedcolumn3dline_1.default, fusioncharts_theme_fusion_1.default, gantt_1.default);
var group_by_pipe_1 = require("./pipes/group-by.pipe");
var keys_pipe_1 = require("./pipes/keys.pipe");
var app_routing_module_1 = require("./app-routing.module");
var app_error_handler_1 = require("./app-error.handler");
var app_title_service_1 = require("./services/app-title.service");
var app_translation_service_1 = require("./services/app-translation.service");
var configuration_service_1 = require("./services/configuration.service");
var alert_service_1 = require("./services/alert.service");
var local_store_manager_service_1 = require("./services/local-store-manager.service");
var endpoint_factory_service_1 = require("./services/endpoint-factory.service");
var notification_endpoint_service_1 = require("./services/notification-endpoint.service");
var notification_service_1 = require("./services/notification.service");
var account_endpoint_service_1 = require("./services/account-endpoint.service");
var account_service_1 = require("./services/account.service");
var taskService_1 = require("./services/tasks/taskService");
var task_endpoint_service_1 = require("./services/tasks/task-endpoint.service");
var app_component_1 = require("./components/app.component");
var home_component_1 = require("./components/home/home.component");
var login_component_1 = require("./components/login/login.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var fusion_component_1 = require("./components/controls/charts/fusion/fusion.component");
var themes_component_1 = require("./components/controls/themes/themes.component");
var machinechart_component_1 = require("./components/controls/charts/machinechart/machinechart.component");
var shiftschart_component_1 = require("./components/controls/charts/shiftschart/shiftschart.component");
var settings_component_1 = require("./components/settings/settings.component");
var search_box_component_1 = require("./components/controls/search-box/search-box.component");
var user_info_component_1 = require("./components/settings/user-info/user-info.component");
var if_tab_active_directive_1 = require("./directives/if-tab-active.directive");
var smart_dashboard_component_1 = require("./components/dashboard/smart-dashboard/smart-dashboard.component");
var smart_settings_component_1 = require("./components/settings/smart-settings/smart-settings.component");
var admin_component_1 = require("./components/admin/admin.component");
var user_management_component_1 = require("./components/admin/user-management/user-management.component");
var role_management_component_1 = require("./components/admin/role-management/role-management.component");
var smart_admin_component_1 = require("./components/admin/smart-admin/smart-admin.component");
var user_preferences_component_1 = require("./components/settings/user-preferences/user-preferences.component");
var user_edit_component_1 = require("./components/controls/editors/user-edit/user-edit.component");
var role_edit_component_1 = require("./components/controls/editors/role-edit/role-edit.component");
var task_management_component_1 = require("./components/admin/task-management/task-management.component");
var task_edit_component_1 = require("./components/controls/editors/task-edit/task-edit.component");
var tasks_component_1 = require("./components/tasks/tasks.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                login_component_1.LoginComponent,
                group_by_pipe_1.GroupByPipe,
                keys_pipe_1.KeysPipe,
                dashboard_component_1.DashboardComponent,
                fusion_component_1.FusionComponent,
                themes_component_1.ThemesComponent,
                machinechart_component_1.MachinechartComponent,
                shiftschart_component_1.ShiftschartComponent,
                settings_component_1.SettingsComponent,
                user_management_component_1.UserManagementComponent,
                search_box_component_1.SearchBoxComponent,
                user_info_component_1.UserInfoComponent,
                if_tab_active_directive_1.IfTabActive,
                smart_dashboard_component_1.SmartDashboardComponent,
                smart_settings_component_1.SmartSettingsComponent,
                admin_component_1.AdminComponent,
                role_management_component_1.RoleManagementComponent,
                smart_admin_component_1.SmartAdminComponent,
                user_preferences_component_1.UserPreferencesComponent,
                user_edit_component_1.UserEditComponent,
                role_edit_component_1.RoleEditComponent,
                task_management_component_1.TaskManagementComponent,
                task_edit_component_1.TaskEditComponent,
                tasks_component_1.TasksComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                ng_select_1.NgSelectModule,
                forms_1.ReactiveFormsModule,
                app_routing_module_1.AppRoutingModule,
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useClass: app_translation_service_1.TranslateLanguageLoader
                    }
                }),
                ngx_toasta_1.ToastaModule.forRoot(),
                angular_1.ClarityModule,
                angular_fusioncharts_1.FusionChartsModule,
                ngx_quill_1.QuillModule
            ],
            providers: [
                { provide: 'BASE_URL', useFactory: getBaseUrl },
                { provide: core_1.ErrorHandler, useClass: app_error_handler_1.AppErrorHandler },
                app_translation_service_1.AppTranslationService,
                local_store_manager_service_1.LocalStoreManager,
                app_title_service_1.AppTitleService,
                notification_endpoint_service_1.NotificationEndpoint,
                notification_service_1.NotificationService,
                account_endpoint_service_1.AccountEndpoint,
                alert_service_1.AlertService,
                account_service_1.AccountService,
                configuration_service_1.ConfigurationService,
                endpoint_factory_service_1.EndpointFactory,
                taskService_1.TaskService,
                task_endpoint_service_1.TaskEndpoint
            ],
            exports: [
                if_tab_active_directive_1.IfTabActive
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
exports.getBaseUrl = getBaseUrl;
//# sourceMappingURL=app.module.js.map