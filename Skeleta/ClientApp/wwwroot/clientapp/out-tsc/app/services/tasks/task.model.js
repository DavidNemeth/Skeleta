"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Task = /** @class */ (function () {
    function Task(title, description, priority, status, developer, developerId, tester, testerId) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.developer = developer;
        this.developerId = developerId;
        this.tester = tester;
        this.testerId = testerId;
    }
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=task.model.js.map