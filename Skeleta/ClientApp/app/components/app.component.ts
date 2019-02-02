import { Component, ViewEncapsulation, OnInit, OnDestroy, ViewChildren, AfterViewInit, QueryList, ElementRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import { FormControl } from '@angular/forms';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	isAppLoaded: boolean;
	isUserLoggedIn: boolean;
	shouldShowLoginModal: boolean;
	removePrebootScreen: boolean;
	newNotificationCount = 0;
	appTitle = 'Skeleta Application';
	collapsed: boolean;
	stickyToasties: number[] = [];

	dataLoadingConsecutiveFailurs = 0;
	notificationsLoadingSubscription: any;


	constructor(private toastaService: ToastaService, private toastaConfig: ToastaConfig,
		public router: Router) {
		this.toastaConfig.theme = 'material';
		this.toastaConfig.position = 'top-right';
		this.toastaConfig.limit = 100;
		this.toastaConfig.showClose = true;
	}

	ngOnInit() {		
		// 1 sec to ensure all the effort to get the css animation working is appreciated :|, Preboot screen is removed .5 sec later
		setTimeout(() => this.isAppLoaded = true, 1000);
		setTimeout(() => this.removePrebootScreen = true, 1500);
		this.collapsed = true;
		this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				const url = (<NavigationStart>event).url;

				if (url !== url.toLowerCase()) {
					this.router.navigateByUrl((<NavigationStart>event).url.toLowerCase());
				}
			}
		});
	}
	

	getYear() {
		return new Date().getUTCFullYear();
	}

	over(value: boolean): void{
		this.collapsed = value;
		console.log(this.collapsed);
	}
}
