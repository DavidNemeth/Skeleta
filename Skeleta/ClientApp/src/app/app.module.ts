import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ToastaModule } from 'ngx-toasta';
import { ClarityModule } from "@clr/angular";
import { NgSelectModule } from '@ng-select/ng-select';

import { EqualValidator } from './directives/equal-validator.directive';

import { FusionChartsModule } from 'angular-fusioncharts';
import FusionCharts from 'fusioncharts/core';
import Column2d from 'fusioncharts/viz/column2d';
import stackedcolumn3dline from 'fusioncharts/viz/stackedcolumn3dline'
import gantt from 'fusioncharts/gantt'
import FusionTheme from 'fusioncharts/themes/es/fusioncharts.theme.fusion';

FusionChartsModule.fcRoot(FusionCharts, Column2d, stackedcolumn3dline, FusionTheme, gantt);

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
import { FusionComponent } from './components/charts/fusion/fusion.component';
import { ThemesComponent } from './components/themes/themes.component';
import { MachinechartComponent } from './components/charts/machinechart/machinechart.component';
import { ShiftschartComponent } from './components/charts/shiftschart/shiftschart.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SearchBoxComponent } from './components/controls/search-box/search-box.component';
import { UserInfoComponent } from './components/settings/user-info/user-info.component';
import { IfTabActive } from './directives/if-tab-active.directive';
import { SmartDashboardComponent } from './components/dashboard/smart-dashboard/smart-dashboard.component';
import { SmartSettingsComponent } from './components/settings/smart-settings/smart-settings.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserManagementComponent } from './components/admin/user-management/user-management.component';
import { RoleManagementComponent } from './components/admin/role-management/role-management.component';
import { SmartAdminComponent } from './components/admin/smart-admin/smart-admin.component';
import { UserPreferencesComponent } from './components/settings/user-preferences/user-preferences.component';
import { UserEditComponent } from './components/controls/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    GroupByPipe,
    DashboardComponent,
    FusionComponent,
    ThemesComponent,
    MachinechartComponent,
    ShiftschartComponent,
    SettingsComponent,
    UserManagementComponent,
    SearchBoxComponent,
    UserInfoComponent,
    IfTabActive,
    SmartDashboardComponent,
    SmartSettingsComponent,
    AdminComponent,
    RoleManagementComponent,
    SmartAdminComponent,
    UserPreferencesComponent,
    EqualValidator,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateLanguageLoader
      }
    }),
    ToastaModule.forRoot(),
    ClarityModule,    
    FusionChartsModule
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
  exports: [
    IfTabActive
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
