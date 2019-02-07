import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { SettingsComponent } from './components/settings/settings.component';
import { ShiftschartComponent } from './components/charts/shiftschart/shiftschart.component';
import { MachinechartComponent } from './components/charts/machinechart/machinechart.component';
import { FusionComponent } from './components/charts/fusion/fusion.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SmartDashboardComponent } from './components/dashboard/smart-dashboard/smart-dashboard.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, canActivate: [AuthGuard], data: { title: 'Home' } },
	{ path: 'login', component: LoginComponent, data: { title: 'Login' } },
	{ path: 'home', redirectTo: '/', pathMatch: 'full' },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], data: { title: 'Settings' } },

  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { title: 'Dashboard' }, children: [
      { path: '', component: SmartDashboardComponent, data: { title: 'Smart Board' } },
      { path: 'machinechart', component: MachinechartComponent, data: { title: 'Machine Breakdown' } },
      { path: 'fusionchart', component: FusionComponent, data: { title: 'Fusion Chart' } },
      { path: 'shiftchart', component: ShiftschartComponent, data: { title: 'Shift Assignment' } }
    ]
  }


];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AuthService, AuthGuard]
})
export class AppRoutingModule { }
