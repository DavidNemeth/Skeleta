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
Object.defineProperty(exports, "__esModule", { value: true });
var Task = /** @class */ (function () {
    function Task(id, title, priority, status) {
        this.id = id;
        this.title = title;
        this.priority = priority;
        this.status = status;
    }
    return Task;
}());
var TaskList = /** @class */ (function (_super) {
    __extends(TaskList, _super);
    function TaskList(openBugcount, resolvedBugcount, developer, tester) {
        var _this = _super.call(this) || this;
        _this.developer = developer;
        _this.tester = tester;
        _this.openBugcount = openBugcount;
        _this.resolvedBugcount = resolvedBugcount;
        return _this;
    }
    return TaskList;
}(Task));
exports.TaskList = TaskList;
var TaskEdit = /** @class */ (function (_super) {
    __extends(TaskEdit, _super);
    function TaskEdit(description, developerId, testerId, bugItems, createdBy, updatedBy, updatedDate, createdDate) {
        var _this = _super.call(this) || this;
        _this.developerId = developerId;
        _this.testerId = testerId;
        _this.description = description;
        _this.createdDate = createdDate;
        _this.createdBy = createdBy;
        _this.updatedDate = updatedDate;
        _this.updatedBy = updatedBy;
        _this.bugItems = bugItems;
        return _this;
    }
    return TaskEdit;
}(Task));
exports.TaskEdit = TaskEdit;
var ExpandTask = /** @class */ (function () {
    function ExpandTask(id, description) {
        this.id = id;
        this.description = description;
    }
    return ExpandTask;
}());
exports.ExpandTask = ExpandTask;
//# sourceMappingURL=task.model.js.map