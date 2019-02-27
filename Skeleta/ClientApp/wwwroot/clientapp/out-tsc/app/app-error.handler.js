"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var AppErrorHandler = /** @class */ (function (_super) {
    __extends(AppErrorHandler, _super);
    // private alertService: AlertService;
    function AppErrorHandler() {
        return _super.call(this) || this;
    }
    AppErrorHandler.prototype.handleError = function (error) {
        // if (this.alertService == null) {
        //   this.alertService = this.injector.get(AlertService);
        // }
        // this.alertService.showStickyMessage("Fatal Error!",
        //   "An unresolved error has occured. Please reload the page to correct this error", MessageSeverity.warn);
        // this.alertService.showStickyMessage("Unhandled Error", error.message || error, MessageSeverity.error, error);
        if (confirm('Fatal Error!\nAn unresolved error has occured. Do you want to reload the page to correct this?\n\nError: ' +
            error.message)) {
            window.location.reload(true);
        }
        _super.prototype.handleError.call(this, error);
    };
    AppErrorHandler = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], AppErrorHandler);
    return AppErrorHandler;
}(core_1.ErrorHandler));
exports.AppErrorHandler = AppErrorHandler;
//# sourceMappingURL=app-error.handler.js.map