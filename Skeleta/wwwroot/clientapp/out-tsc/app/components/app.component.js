var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ToastaService, ToastaConfig } from 'ngx-toasta';
import { FormControl } from '@angular/forms';
var AppComponent = /** @class */ (function () {
    function AppComponent(toastaService, toastaConfig, router) {
        this.toastaService = toastaService;
        this.toastaConfig = toastaConfig;
        this.router = router;
        this.mode = new FormControl('side');
        this.newNotificationCount = 0;
        this.appTitle = 'Skeleta Application';
        this.stickyToasties = [];
        this.dataLoadingConsecutiveFailurs = 0;
        this.toastaConfig.theme = 'material';
        this.toastaConfig.position = 'top-right';
        this.toastaConfig.limit = 100;
        this.toastaConfig.showClose = true;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // 1 sec to ensure all the effort to get the css animation working is appreciated :|, Preboot screen is removed .5 sec later
        setTimeout(function () { return _this.isAppLoaded = true; }, 1000);
        setTimeout(function () { return _this.removePrebootScreen = true; }, 1500);
        this.router.events.subscribe(function (event) {
            if (event instanceof NavigationStart) {
                var url = event.url;
                if (url !== url.toLowerCase()) {
                    _this.router.navigateByUrl(event.url.toLowerCase());
                }
            }
        });
    };
    AppComponent.prototype.getYear = function () {
        return new Date().getUTCFullYear();
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [ToastaService, ToastaConfig,
            Router])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map