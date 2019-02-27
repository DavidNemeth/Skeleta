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
var data = {
    "tasks": {
        "showlabels": "1",
        "color": "#5D62B5",
        "task": [
            {
                "processid": "EMP120",
                "start": "07:00:00",
                "end": "16:00:00",
                "label": "Morning Shift"
            },
            {
                "processid": "EMP121",
                "start": "14:00:00",
                "end": "22:00:00",
                "label": "Afternoon Shift"
            },
            {
                "processid": "EMP122",
                "start": "14:00:00",
                "end": "18:30:00",
                "label": "Half Day"
            },
            {
                "processid": "EMP123",
                "start": "07:00:00",
                "end": "16:00:00",
                "label": "Morning Shift"
            },
            {
                "processid": "EMP124",
                "start": "14:00:00",
                "end": "22:00:00",
                "label": "Afternoon Shift"
            },
            {
                "processid": "EMP125",
                "start": "00:00:00",
                "end": "08:00:00",
                "label": "Early Morning support"
            },
            {
                "processid": "EMP126",
                "start": "07:00:00",
                "end": "11:30:00",
                "label": "Half Day"
            }
        ]
    },
    "processes": {
        "fontsize": "12",
        "isbold": "1",
        "align": "Center",
        "headertext": "Employee",
        "headerfontsize": "14",
        "headervalign": "middle",
        "headeralign": "left",
        "process": [
            {
                "label": "Betty",
                "id": "EMP120"
            },
            {
                "label": "William",
                "id": "EMP121"
            },
            {
                "label": "Emma",
                "id": "EMP122"
            },
            {
                "label": "Oliver",
                "id": "EMP123"
            },
            {
                "label": "Lucas",
                "id": "EMP124"
            },
            {
                "label": "Alex",
                "id": "EMP125"
            },
            {
                "label": "John",
                "id": "EMP126"
            }
        ]
    },
    "categories": [
        {
            "category": [
                {
                    "start": "00:00:00",
                    "end": "23:59:59",
                    "label": "Time"
                }
            ]
        },
        {
            "align": "center",
            "category": [
                {
                    "start": "00:00:00",
                    "end": "02:59:59",
                    "label": "Midnight"
                },
                {
                    "start": "03:00:00",
                    "end": "05:59:59",
                    "label": "3 AM"
                },
                {
                    "start": "06:00:00",
                    "end": "08:59:59",
                    "label": "6 AM"
                },
                {
                    "start": "09:00:00",
                    "end": "11:59:59",
                    "label": "9 AM"
                },
                {
                    "start": "12:00:00",
                    "end": "14:59:59",
                    "label": "12 PM"
                },
                {
                    "start": "15:00:00",
                    "end": "17:59:59",
                    "label": "3 PM"
                },
                {
                    "start": "18:00:00",
                    "end": "20:59:59",
                    "label": "6 PM"
                },
                {
                    "start": "21:00:00",
                    "end": "23:59:59",
                    "label": "9 PM"
                }
            ]
        }
    ],
    "chart": {
        "dateformat": "dd/mm/yyyy",
        "outputdateformat": "hh:mn",
        "caption": "Shift Roster for June",
        "subcaption": "Machine1",
        "ganttpaneduration": "22",
        "ganttpanedurationunit": "h",
        "scrolltodate": "09:00:00",
        "useverticalscrolling": "0",
        "theme": "fusion"
    }
};
var ShiftschartComponent = /** @class */ (function () {
    function ShiftschartComponent() {
        this.width = "100%";
        this.height = 400;
        this.type = 'gantt';
        this.dataFormat = 'json';
        this.dataSource = data;
    }
    ShiftschartComponent.prototype.ngOnInit = function () {
    };
    ShiftschartComponent = __decorate([
        core_1.Component({
            selector: 'app-shiftschart',
            templateUrl: './shiftschart.component.html',
            styleUrls: ['./shiftschart.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ShiftschartComponent);
    return ShiftschartComponent;
}());
exports.ShiftschartComponent = ShiftschartComponent;
//# sourceMappingURL=shiftschart.component.js.map