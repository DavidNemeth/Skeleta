"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/operators");
var platform_browser_1 = require("@angular/platform-browser");
var utilities_1 = require("./utilities");
var AppTitleService = /** @class */ (function () {
    function AppTitleService(titleService, router) {
        var _this = this;
        this.titleService = titleService;
        this.router = router;
        this.sub = this.router.events.pipe(operators_1.filter(function (event) { return event instanceof router_1.NavigationEnd; }), operators_1.map(function (_) { return _this.router.routerState.root; }), operators_1.map(function (route) {
            while (route.firstChild)
                route = route.firstChild;
            return route;
        }), operators_1.flatMap(function (route) { return route.data; }))
            .subscribe(function (data) {
            var title = data['title'];
            if (title) {
                var fragment = _this.router.url.split('#')[1];
                if (fragment)
                    title += ' | ' + utilities_1.Utilities.toTitleCase(fragment);
            }
            if (title && _this.appName)
                title += ' - ' + _this.appName;
            else if (_this.appName)
                title = _this.appName;
            if (title)
                _this.titleService.setTitle(title);
        });
    }
    AppTitleService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [platform_browser_1.Title, router_1.Router])
    ], AppTitleService);
    return AppTitleService;
}());
exports.AppTitleService = AppTitleService;
//# sourceMappingURL=app-title.service.js.map