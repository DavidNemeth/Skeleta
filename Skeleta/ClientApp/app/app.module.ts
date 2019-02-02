import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ToastaModule } from 'ngx-toasta';
import { MaterialModule } from './material.module';
import { ClarityModule } from "@clr/angular";

import { AppRoutingModule } from './app-routing.module';
import { AppErrorHandler } from './app-error.handler';

import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		ToastaModule.forRoot(),
		MaterialModule,
		ClarityModule
	],
	providers: [
		{ provide: ErrorHandler, useClass: AppErrorHandler }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
	return document.getElementsByTagName('base')[0].href;
}
