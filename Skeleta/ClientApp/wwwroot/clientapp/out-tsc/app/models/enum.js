"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CrudAction;
(function (CrudAction) {
    CrudAction["Create"] = "Create";
    CrudAction["Read"] = "Read";
    CrudAction["Update"] = "Update";
    CrudAction["Delete"] = "Delete";
})(CrudAction = exports.CrudAction || (exports.CrudAction = {}));
var Gender;
(function (Gender) {
    Gender[Gender["None"] = 0] = "None";
    Gender[Gender["Female"] = 1] = "Female";
    Gender[Gender["Male"] = 2] = "Male";
})(Gender = exports.Gender || (exports.Gender = {}));
var Job;
(function (Job) {
    Job["None"] = "None";
    Job["Developer"] = "Developer";
    Job["Tester"] = "Tester";
    Job["Manager"] = "Manager";
})(Job = exports.Job || (exports.Job = {}));
var Priority;
(function (Priority) {
    Priority["Critical"] = "Critical";
    Priority["High"] = "High";
    Priority["Medium"] = "Medium";
    Priority["Low"] = "Low";
})(Priority = exports.Priority || (exports.Priority = {}));
var Status;
(function (Status) {
    Status["New"] = "New";
    // Rejected = "Rejected",
    Status["Active"] = "Active";
    Status["Resolved"] = "Resolved";
    Status["Completed"] = "Completed";
    Status["Closed"] = "Closed";
})(Status = exports.Status || (exports.Status = {}));
//# sourceMappingURL=enum.js.map