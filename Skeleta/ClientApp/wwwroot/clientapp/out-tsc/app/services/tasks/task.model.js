"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Task = /** @class */ (function () {
    function Task(title, description, id, priority, status, developer, developerId, tester, testerId, openBugcount, resolvedBugcount, bugItems, createdBy, updatedBy, updatedDate, createdDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.developer = developer;
        this.developerId = developerId;
        this.tester = tester;
        this.testerId = testerId;
        this.bugItems = bugItems;
        this.openBugcount = openBugcount;
        this.resolvedBugcount = resolvedBugcount;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.updatedDate = updatedDate;
        this.updatedBy = updatedBy;
    }
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=task.model.js.map