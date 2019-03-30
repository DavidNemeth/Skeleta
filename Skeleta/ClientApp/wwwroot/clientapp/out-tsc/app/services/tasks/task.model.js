"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Task = /** @class */ (function () {
    function Task(title, description, comment, priority, status, developer, tester, developerName, developerId, testerName, testerId) {
        this.title = title;
        this.description = description;
        this.comment = comment;
        this.priority = priority;
        this.status = status;
        this.developer = developer;
        this.developerId = developerId;
        this.developerName = developerName;
        this.tester = tester;
        this.testerId = testerId;
        this.testerName = testerName;
    }
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=task.model.js.map