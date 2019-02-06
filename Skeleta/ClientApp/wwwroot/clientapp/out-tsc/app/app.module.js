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
var material_module_1 = require("./material.module");
var angular_1 = require("@clr/angular");
var ng2_google_charts_1 = require("ng2-google-charts");
var angular_fusioncharts_1 = require("angular-fusioncharts");
var core_3 = require("fusioncharts/core");
var column2d_1 = require("fusioncharts/viz/column2d");
var stackedcolumn3dline_1 = require("fusioncharts/viz/stackedcolumn3dline");
var gantt_1 = require("fusioncharts/gantt");
var fusioncharts_theme_fusion_1 = require("fusioncharts/themes/es/fusioncharts.theme.fusion");
angular_fusioncharts_1.FusionChartsModule.fcRoot(core_3.default, column2d_1.default, stackedcolumn3dline_1.default, fusioncharts_theme_fusion_1.default, gantt_1.default);
var group_by_pipe_1 = require("./pipes/group-by.pipe");
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
var app_component_1 = require("./components/app.component");
var home_component_1 = require("./components/home/home.component");
var login_component_1 = require("./components/login/login.component");
var dashboard_component_1 = require("./components/dashboard/dashboard.component");
var fusion_component_1 = require("./components/fusion/fusion.component");
var themes_component_1 = require("./components/themes/themes.component");
var machinechart_component_1 = require("./components/charts/machinechart/machinechart.component");
var shiftschart_component_1 = require("./components/charts/shiftschart/shiftschart.component");
var settings_component_1 = require("./components/settings/settings.component");
var user_management_component_1 = require("./components/controls/user-management/user-management.component");
var search_box_component_1 = require("./components/controls/search-box/search-box.component");
var user_info_component_1 = require("./components/controls/user-info/user-info.component");
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
                dashboard_component_1.DashboardComponent,
                fusion_component_1.FusionComponent,
                themes_component_1.ThemesComponent,
                machinechart_component_1.MachinechartComponent,
                shiftschart_component_1.ShiftschartComponent,
                settings_component_1.SettingsComponent,
                user_management_component_1.UserManagementComponent,
                search_box_component_1.SearchBoxComponent,
                user_info_component_1.UserInfoComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                app_routing_module_1.AppRoutingModule,
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useClass: app_translation_service_1.TranslateLanguageLoader
                    }
                }),
                ngx_toasta_1.ToastaModule.forRoot(),
                material_module_1.MaterialModule,
                angular_1.ClarityModule,
                angular_fusioncharts_1.FusionChartsModule,
                ng2_google_charts_1.Ng2GoogleChartsModule
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
                endpoint_factory_service_1.EndpointFactory
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