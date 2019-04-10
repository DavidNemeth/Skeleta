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
var alert_service_1 = require("../../../services/alert.service");
var app_translation_service_1 = require("../../../services/app-translation.service");
var bugitem_edit_component_1 = require("../../controls/editors/bugitem-edit/bugitem-edit.component");
var bugitemService_1 = require("../../../services/bugItems/bugitemService");
var utilities_1 = require("../../../services/utilities");
var animations_1 = require("../../../services/animations");
var enum_1 = require("../../../models/enum");
var BugitemsComponent = /** @class */ (function () {
    function BugitemsComponent(alertService, translationService, bugitemService) {
        var _this = this;
        this.alertService = alertService;
        this.translationService = translationService;
        this.bugitemService = bugitemService;
        this.columns = [];
        this.bugs = [];
        this.ActiveBugs = [];
        this.ResolvedBugs = [];
        this.CompletedBugs = [];
        this.bugsCache = [];
        this.selected = [];
        this.gT = function (key) { return _this.translationService.getTranslation(key); };
    }
    BugitemsComponent.prototype.ngOnInit = function () {
        console.log(this.bugItems);
        this.bugs = [];
        this.bugsCache = [];
        this.onDataLoadSuccessful(this.bugItems);
    };
    BugitemsComponent.prototype.onSearchChanged = function (value) {
        this.bugs = this.bugsCache
            .filter(function (r) { return utilities_1.Utilities.searchArray(value, false, r.title, r.status); });
    };
    BugitemsComponent.prototype.onAdd = function () {
        this.sourceBug = null;
        this.bugEdit.Create(this.taskId, this.developerId, this.testerId);
    };
    BugitemsComponent.prototype.onEdit = function (bug) {
        this.sourceBug = bug;
        this.bugEdit.Edit(bug.id);
    };
    BugitemsComponent.prototype.updateList = function (returnBug) {
        this.loadData(returnBug.taskItemId);
    };
    BugitemsComponent.prototype.loadData = function (taskid) {
        this.loadAll(taskid);
    };
    BugitemsComponent.prototype.loadAll = function (taskid) {
        var _this = this;
        this.bugs = [];
        this.bugsCache = [];
        this.alertService.startLoadingMessage();
        this.loadingIndicator = true;
        this.bugitemService.GetAllBugItem(taskid)
            .subscribe(function (results) { return _this.onDataLoadSuccessful(results); }, function (error) { return _this.onDataLoadFailed(error); });
    };
    BugitemsComponent.prototype.onDataLoadSuccessful = function (bugs) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.bugsCache = bugs;
        this.bugs = bugs;
        this.ActiveBugs = bugs.filter(function (x) { return x.status == enum_1.Status.New || x.status == enum_1.Status.Active; });
        this.ResolvedBugs = bugs.filter(function (x) { return x.status == enum_1.Status.Resolved; });
        this.CompletedBugs = bugs.filter(function (x) { return x.status == enum_1.Status.Completed; });
    };
    BugitemsComponent.prototype.onDataLoadFailed = function (error) {
        this.alertService.stopLoadingMessage();
        this.loadingIndicator = false;
        this.alertService.showStickyMessage('Load Error', "Unable to retrieve users from the server.\r\nErrors: \"" + utilities_1.Utilities.getHttpResponseMessage(error) + "\"", alert_service_1.MessageSeverity.error, error);
    };
    BugitemsComponent.prototype.removeItem = function (bug) {
        var itemIndex = this.bugs.indexOf(bug, 0);
        if (itemIndex > -1) {
            this.bugs.splice(itemIndex, 1);
        }
    };
    BugitemsComponent.prototype.updateItem = function (bug) {
        var index = this.bugs.indexOf(bug);
        this.bugs[index] = bug;
    };
    BugitemsComponent.prototype.closeTab = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], BugitemsComponent.prototype, "taskId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BugitemsComponent.prototype, "developerId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], BugitemsComponent.prototype, "testerId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], BugitemsComponent.prototype, "bugItems", void 0);
    __decorate([
        core_1.ViewChild(bugitem_edit_component_1.BugitemEditComponent),
        __metadata("design:type", Object)
    ], BugitemsComponent.prototype, "bugEdit", void 0);
    BugitemsComponent = __decorate([
        core_1.Component({
            selector: 'app-bugitems',
            templateUrl: './bugitems.component.html',
            styleUrls: ['./bugitems.component.css'],
            animations: [animations_1.fadeInOut]
        }),
        __metadata("design:paramtypes", [alert_service_1.AlertService, app_translation_service_1.AppTranslationService, bugitemService_1.BugItemService])
    ], BugitemsComponent);
    return BugitemsComponent;
}());
exports.BugitemsComponent = BugitemsComponent;
//# sourceMappingURL=bugitems.component.js.map