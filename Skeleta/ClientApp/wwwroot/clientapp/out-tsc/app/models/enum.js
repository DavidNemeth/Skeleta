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
var Priority;
(function (Priority) {
    Priority[Priority["Critical"] = 0] = "Critical";
    Priority[Priority["High"] = 1] = "High";
    Priority[Priority["Medium"] = 2] = "Medium";
    Priority[Priority["Low"] = 3] = "Low";
})(Priority = exports.Priority || (exports.Priority = {}));
var Status;
(function (Status) {
    Status[Status["New"] = 0] = "New";
    Status[Status["Rejected"] = 1] = "Rejected";
    Status[Status["Active"] = 2] = "Active";
    Status[Status["Resolved"] = 3] = "Resolved";
    Status[Status["Completed"] = 4] = "Completed";
    Status[Status["Closed"] = 5] = "Closed";
})(Status = exports.Status || (exports.Status = {}));
//# sourceMappingURL=enum.js.map