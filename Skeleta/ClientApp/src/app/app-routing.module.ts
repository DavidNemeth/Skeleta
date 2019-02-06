import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { SettingsComponent } from './components/settings/settings.component';
import { ShiftschartComponent } from './components/charts/shiftschart/shiftschart.component';
import { MachinechartComponent } from './components/charts/machinechart/machinechart.component';
import { FusionComponent } from './components/fusion/fusion.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, canActivate: [AuthGuard], data: { title: 'Home' } },
	{ path: 'login', component: LoginComponent, data: { title: 'Login' } },
	{ path: 'home', redirectTo: '/', pathMatch: 'full' },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], data: { title: 'Settings' } },
  { path: 'shiftchart', component: ShiftschartComponent, data: { title: 'Shift-Chart' } },
  { path: 'machinechart', component: MachinechartComponent, data: { title: 'Machine-Chart' } },
  { path: 'fusionchart', component: FusionComponent, data: { title: 'Fusion-Chart' } },
  { path: 'googlechart', component: DashboardComponent, data: { title: 'Google-Chart' } }

];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AuthService, AuthGuard]
})
export class AppRoutingModule { }
