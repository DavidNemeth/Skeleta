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
var account_service_1 = require("../../../services/account.service");
var alert_service_1 = require("../../../services/alert.service");
var app_translation_service_1 = require("../../../services/app-translation.service");
var bugitem_edit_component_1 = require("../../controls/editors/bugitem-edit/bugitem-edit.component");
var bugitemService_1 = require("../../../services/bugItems/bugitemService");
var utilities_1 = require("../../../services/utilities");
var BugitemsComponent = /** @class */ (function () {
    function BugitemsComponent(accountService, alertService, translationService, bugitemService) {
        var _this = this;
        this.accountService = accountService;
        this.alertService = alertService;
        this.translationService = translationService;
        this.bugitemService = bugitemService;
        this.columns = [];
        this.bugs = [];
        this.bugsCache = [];
        this.selected = [];
        this.gT = function (key) { return _this.translationService.getTranslation(key); };
        this.isOpen = false;
    }
    BugitemsComponent.prototype.ngOnInit = function () {
        this.PendingActive = true;
        this.loadData();
    };
    BugitemsComponent.prototype.onSearchChanged = function (value) {
        this.bugs = this.bugsCache
            .filter(function (r) { return utilities_1.Utilities.searchArray(value, false, r.id, r.title, r.status, r.developer.fullName, r.developer.fullName, r.TaskItemTitle); });
    };
    BugitemsComponent.prototype.onAdd = function () {
        this.sourceBug = null;
        this.bugEdit.Create();
        this.isOpen = true;
    };
    BugitemsComponent.prototype.onEdit = function (bug) {
        this.sourceBug = bug;
        this.bugEdit.Edit(bug);
        this.isOpen = true;
    };
    BugitemsComponent.prototype.loadData = function () {
        if (this.PendingActive) {
            this.loadPending();
        }
        if (this.ResolvedActive) {
            this.loadResolved();
        }
    };
    BugitemsComponent.prototype.loadPending = function () {
        var _this = this;
        this.bugs = [];
        this.bugsCache = [];
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.bugitemService.GetPendingBugs()
            .subscribe(function (results) { return _this.onDataLoadSuccessful(results); }, function (error) { return _this.onDataLoadFailed(error); });
    };
    BugitemsComponent.prototype.loadResolved = function () {
        var _this = this;
        this.bugs = [];
        this.bugsCache = [];
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.bugitemService.GetResolvedBugs()
            .subscribe(function (results) { return _this.onDataLoadSuccessful(results); }, function (error) { return _this.onDataLoadFailed(error); });
    };
    BugitemsComponent.prototype.onDataLoadSuccessful = function (bugs) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.bugsCache = bugs;
        this.bugs = bugs;
    };
    BugitemsComponent.prototype.onDataLoadFailed = function (error) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.alertService.showStickyMessage('Load Error', "Unable to retrieve users from the server.\r\nErrors: \"" + utilities_1.Utilities.getHttpResponseMessage(error) + "\"", alert_service_1.MessageSeverity.error, error);
    };
    __decorate([
        core_1.ViewChild(bugitem_edit_component_1.BugitemEditComponent),
        __metadata("design:type", Object)
    ], BugitemsComponent.prototype, "bugEdit", void 0);
    BugitemsComponent = __decorate([
        core_1.Component({
            selector: 'app-bugitems',
            templateUrl: './bugitems.component.html',
            styleUrls: ['./bugitems.component.css']
        }),
        __metadata("design:paramtypes", [account_service_1.AccountService, alert_service_1.AlertService,
            app_translation_service_1.AppTranslationService, bugitemService_1.BugItemService])
    ], BugitemsComponent);
    return BugitemsComponent;
}());
exports.BugitemsComponent = BugitemsComponent;
//# sourceMappingURL=bugitems.component.js.map