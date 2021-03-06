import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { SettingsComponent } from './components/settings/settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SmartDashboardComponent } from './components/dashboard/smart-dashboard/smart-dashboard.component';
import { SmartSettingsComponent } from './components/settings/smart-settings/smart-settings.component';
import { UserManagementComponent } from './components/admin/user-management/user-management.component';
import { RoleManagementComponent } from './components/admin/role-management/role-management.component';
import { UserInfoComponent } from './components/settings/user-info/user-info.component';
import { UserPreferencesComponent } from './components/settings/user-preferences/user-preferences.component';
import { SmartAdminComponent } from './components/admin/smart-admin/smart-admin.component';
import { AdminComponent } from './components/admin/admin.component';
import { TaskManagementComponent } from './components/admin/task-management/task-management.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { BugitemsComponent } from './components/tasks/bugitems/bugitems.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], data: { title: 'Home' } },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'home', redirectTo: '/', pathMatch: 'full', data: { title: 'Home' } },

  {
    path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], data: { title: 'Settings' }, children: [
      { path: '', component: SmartSettingsComponent, data: { title: 'Settings' } },
      { path: 'profile', component: UserInfoComponent, data: { title: 'Profile' } },
      { path: 'preferences', component: UserPreferencesComponent, data: { title: 'Profile' } }
    ]
  },

  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { title: 'Dashboard' }, children: [
      { path: '', component: SmartDashboardComponent, data: { title: 'Smart Panel' } },
    ]
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { title: 'Settings' }, children: [
      { path: '', component: SmartAdminComponent, data: { title: 'Smart Panel' } },
      { path: 'users', component: UserManagementComponent, data: { title: 'Users' } },
      { path: 'roles', component: RoleManagementComponent, data: { title: 'Roles' } },
      { path: 'tasks', component: TaskManagementComponent, data: { title: 'Tasks' } }
    ]
  },
  {
    path: 'tasks', component: TasksComponent, canActivate: [AuthGuard], data: { title: 'Settings' }, children: [
      { path: '', component: SmartAdminComponent, data: { title: 'Smart Panel' } },
      { path: 'tasks', component: TaskManagementComponent, data: { title: 'Tasks' } },
      { path: 'bugs', component: BugitemsComponent, data: { title: 'Bugs' } }
    ]
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard]
})
export class AppRoutingModule { }
