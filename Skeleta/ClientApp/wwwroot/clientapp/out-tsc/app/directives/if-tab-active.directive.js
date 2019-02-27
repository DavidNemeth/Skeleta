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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("@clr/angular");
var IfTabActive = /** @class */ (function () {
    function IfTabActive(tab, elRef, renderer) {
        this.tab = tab;
        this.elRef = elRef;
        this.renderer = renderer;
        this.vscIfTabActiveChange = new core_1.EventEmitter();
    }
    IfTabActive.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription =
            this.tab.ifActiveService.currentChange.subscribe(function (newCurrentId) {
                if (_this.activeClass) {
                    if (_this.tab.active) {
                        _this.renderer.addClass(_this.elRef.nativeElement, _this.activeClass);
                    }
                    else {
                        _this.renderer.removeClass(_this.elRef.nativeElement, _this.activeClass);
                    }
                }
                _this.vscIfTabActiveChange.emit(_this.tab.active);
            });
    };
    IfTabActive.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], IfTabActive.prototype, "vscIfTabActiveChange", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], IfTabActive.prototype, "activeClass", void 0);
    IfTabActive = __decorate([
        core_1.Directive({
            selector: '[vscIfTabActive]'
        })
        /**
         * A directive that detects when an active tab changes and sends notification.
         * Optionally consumer may specify a css class to be applied on the
         * active tab only.
         * <clr-tab vscIfTabActive [activeClass]="'activeTab'">
         */
        ,
        __param(0, core_1.Host()), __param(0, core_1.Self()),
        __metadata("design:paramtypes", [angular_1.ClrTab, core_1.ElementRef,
            core_1.Renderer2])
    ], IfTabActive);
    return IfTabActive;
}());
exports.IfTabActive = IfTabActive;
//# sourceMappingURL=if-tab-active.directive.js.map