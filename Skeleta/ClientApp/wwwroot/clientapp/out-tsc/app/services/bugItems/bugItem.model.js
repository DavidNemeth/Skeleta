"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BugItem = /** @class */ (function () {
    function BugItem(title, description, status, developer, developerId, tester, testerId, taskItemTitle, taskItemId) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.developer = developer;
        this.developerId = developerId;
        this.tester = tester;
        this.testerId = testerId;
        this.taskItemTitle = taskItemTitle;
        this.taskItemId = taskItemId;
    }
    return BugItem;
}());
exports.BugItem = BugItem;
//# sourceMappingURL=bugItem.model.js.map