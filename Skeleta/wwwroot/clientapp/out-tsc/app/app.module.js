var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ToastaModule } from 'ngx-toasta';
import { MaterialModule } from './material.module';
import { ClarityModule } from "@clr/angular";
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { FusionChartsModule } from 'angular-fusioncharts';
import FusionCharts from 'fusioncharts/core';
import Column2d from 'fusioncharts/viz/column2d';
import stackedcolumn3dline from 'fusioncharts/viz/stackedcolumn3dline';
import FusionTheme from 'fusioncharts/themes/es/fusioncharts.theme.fusion';
import ocean from 'fusioncharts/themes/es/fusioncharts.theme.ocean';
FusionChartsModule.fcRoot(FusionCharts, Column2d, stackedcolumn3dline, FusionTheme, ocean);
import { GroupByPipe } from './pipes/group-by.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppErrorHandler } from './app-error.handler';
import { AppTitleService } from './services/app-title.service';
import { AppTranslationService, TranslateLanguageLoader } from './services/app-translation.service';
import { ConfigurationService } from './services/configuration.service';
import { AlertService } from './services/alert.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { EndpointFactory } from './services/endpoint-factory.service';
import { NotificationEndpoint } from './services/notification-endpoint.service';
import { NotificationService } from './services/notification.service';
import { AccountEndpoint } from './services/account-endpoint.service';
import { AccountService } from './services/account.service';
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FusionComponent } from './components/fusion/fusion.component';
import { ThemesComponent } from './components/themes/themes.component';
import { MachinechartComponent } from './components/charts/machinechart/machinechart.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                HomeComponent,
                LoginComponent,
                GroupByPipe,
                DashboardComponent,
                FusionComponent,
                ThemesComponent,
                MachinechartComponent
            ],
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
                AppRoutingModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useClass: TranslateLanguageLoader
                    }
                }),
                ToastaModule.forRoot(),
                MaterialModule,
                ClarityModule,
                FusionChartsModule,
                Ng2GoogleChartsModule
            ],
            providers: [
                { provide: 'BASE_URL', useFactory: getBaseUrl },
                { provide: ErrorHandler, useClass: AppErrorHandler },
                AppTranslationService,
                LocalStoreManager,
                AppTitleService,
                NotificationEndpoint,
                NotificationService,
                AccountEndpoint,
                AlertService,
                AccountService,
                ConfigurationService,
                EndpointFactory
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
//# sourceMappingURL=app.module.js.map