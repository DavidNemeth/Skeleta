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
var SmartDashboardComponent = /** @class */ (function () {
    function SmartDashboardComponent(route) {
        this.route = route;
    }
    SmartDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route
            .data
            .subscribe(function (v) { return _this.title = v.title; });
    };
    SmartDashboardComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    SmartDashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-smart-dashboard',
            templateUrl: './smart-dashboard.component.html',
            styleUrls: ['./smart-dashboard.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute])
    ], SmartDashboardComponent);
    return SmartDashboardComponent;
}());
exports.SmartDashboardComponent = SmartDashboardComponent;
//# sourceMappingURL=smart-dashboard.component.js.map