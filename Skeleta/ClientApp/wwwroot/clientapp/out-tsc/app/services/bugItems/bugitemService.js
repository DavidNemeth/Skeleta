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
var http_1 = require("@angular/common/http");
var auth_service_1 = require("../auth.service");
var router_1 = require("@angular/router");
var bugItem_endpoint_service_1 = require("./bugItem-endpoint.service");
var BugItemService = /** @class */ (function () {
    function BugItemService(router, http, bugItemEndpoint, authService) {
        this.router = router;
        this.http = http;
        this.bugItemEndpoint = bugItemEndpoint;
        this.authService = authService;
    }
    BugItemService.prototype.GetAllBugItem = function () {
        return this.bugItemEndpoint.getAllEndpoint();
    };
    BugItemService.prototype.GetPendingBugs = function () {
        return this.bugItemEndpoint.getPendingEndpoint();
    };
    BugItemService.prototype.GetResolvedBugs = function () {
        return this.bugItemEndpoint.getResolvedEndpoint();
    };
    BugItemService.prototype.GetClosedBugs = function () {
        return this.bugItemEndpoint.getClosedEndpoint();
    };
    BugItemService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, http_1.HttpClient,
            bugItem_endpoint_service_1.BugItemEndpoint, auth_service_1.AuthService])
    ], BugItemService);
    return BugItemService;
}());
exports.BugItemService = BugItemService;
//# sourceMappingURL=bugitemService.js.map