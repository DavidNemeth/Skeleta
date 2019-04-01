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

import { QuillModule } from 'ngx-quill'
import { FusionChartsModule } from 'angular-fusioncharts';
import FusionCharts from 'fusioncharts/core';
import Column2d from 'fusioncharts/viz/column2d';
import stackedcolumn3dline from 'fusioncharts/viz/stackedcolumn3dline'
import gantt from 'fusioncharts/gantt'
import FusionTheme from 'fusioncharts/themes/es/fusioncharts.theme.fusion';

FusionChartsModule.fcRoot(FusionCharts, Column2d, stackedcolumn3dline, FusionTheme, gantt);

import { GroupByPipe } from './pipes/group-by.pipe';
import { KeysPipe } from './pipes/keys.pipe';

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
import { TaskService } from './services/tasks/taskService';
import { TaskEndpoint } from './services/tasks/task-endpoint.service';
import { BugItemService } from './services/bugItems/bugitemService';
import { BugItemEndpoint } from './services/bugItems/bugItem-endpoint.service';

import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FusionComponent } from './components/controls/charts/fusion/fusion.component';
import { MachinechartComponent } from './components/controls/charts/machinechart/machinechart.component';
import { ShiftschartComponent } from './components/controls/charts/shiftschart/shiftschart.component';
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
import { UserEditComponent } from './components/controls/editors/user-edit/user-edit.component';
import { RoleEditComponent } from './components/controls/editors/role-edit/role-edit.component';
import { TaskManagementComponent } from './components/admin/task-management/task-management.component';
import { TaskEditComponent } from './components/controls/editors/task-edit/task-edit.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { BugitemsComponent } from './components/tasks/bugitems/bugitems.component';
import { BugitemEditComponent } from './components/controls/editors/bugitem-edit/bugitem-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    GroupByPipe,
    KeysPipe,
    DashboardComponent,
    FusionComponent,
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
    UserEditComponent,
    RoleEditComponent,
    TaskManagementComponent,
    TaskEditComponent,
    TasksComponent,
    BugitemsComponent,
    BugitemEditComponent
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
    FusionChartsModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          [{ 'size': ['small', false, 'large', 'huge'] }], 
          ['bold', 'italic', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['link', 'image', 'video'],
        ]       
      }
    })
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
    EndpointFactory,
    TaskService,
    TaskEndpoint,
    BugItemService,
    BugItemEndpoint
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
