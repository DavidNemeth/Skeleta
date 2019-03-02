"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Task = /** @class */ (function () {
    function Task(title, description, comment, priority, status, assignedTo, assignedBy, assignedToName) {
        this.title = title;
        this.description = description;
        this.comment = comment;
        this.priority = priority;
        this.status = status;
        this.assignedTo = assignedTo;
        this.assignedBy = assignedBy;
        this.assignedToName = assignedToName;
    }
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=task.model.js.map