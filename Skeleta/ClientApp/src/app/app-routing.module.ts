import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
	{ path: '', component: HomeComponent, canActivate: [AuthGuard], data: { title: 'Home' } },
	{ path: 'login', component: LoginComponent, data: { title: 'Login' } },
	{ path: 'home', redirectTo: '/', pathMatch: 'full' },

];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AuthService, AuthGuard]
})
export class AppRoutingModule { }
