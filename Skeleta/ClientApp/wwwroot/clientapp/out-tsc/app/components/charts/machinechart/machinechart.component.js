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
    "chart": {
        "caption": "Machine Operating Schedule For Sun Industries",
        "subcaption": "Denver Plant",
        "theme": "fusion",
        "dateformat": "dd/mm/yyyy",
        "plottooltext": "Status for period <b>$start - $end</b> is <b>$label</b>"
    },
    "legend": {
        "item": [
            {
                "label": "In use",
                "color": "#62B58D"
            },
            {
                "label": "Repair",
                "color": "#FFC533"
            },
            {
                "label": "Idle",
                "color": "#F2726F"
            }
        ]
    },
    "tasks": {
        "task": [
            {
                "label": "In Use",
                "processid": "A",
                "start": "1/1/2018",
                "end": "13/1/2018",
                "bordercolor": "#62B58D",
                "color": "#62B58D",
                "id": "1"
            },
            {
                "label": "Idle",
                "processid": "A",
                "start": "13/1/2018",
                "end": "18/1/2018",
                "bordercolor": "#F2726F",
                "color": "#F2726F",
                "id": "2"
            },
            {
                "label": "In Use",
                "processid": "A",
                "start": "18/1/2018",
                "end": "27/1/2018",
                "bordercolor": "#62B58D",
                "color": "#62B58D",
                "id": "3"
            },
            {
                "label": "Repair",
                "processid": "A",
                "start": "27/1/2018",
                "end": "29/1/2018",
                "bordercolor": "#FFC533",
                "color": "#FFC533",
                "id": "4"
            },
            {
                "label": "In Use",
                "processid": "A",
                "start": "29/1/2018",
                "end": "4/2/2018",
                "bordercolor": "#62B58D",
                "color": "#62B58D",
                "id": "5"
            },
            {
                "label": "Idle",
                "processid": "B",
                "start": "1/1/2018",
                "end": "7/1/2018",
                "bordercolor": "#F2726F",
                "color": "#F2726F",
                "id": "6"
            },
            {
                "label": "In Use",
                "processid": "B",
                "start": "7/1/2018",
                "end": "18/1/2018",
                "bordercolor": "#62B58D",
                "color": "#62B58D",
                "id": "7"
            },
            {
                "label": "Repair",
                "processid": "B",
                "start": "18/1/2018",
                "end": "24/1/2018",
                "bordercolor": "#FFC533",
                "color": "#FFC533",
                "id": "8"
            },
            {
                "label": "In Use",
                "processid": "B",
                "start": "24/1/2018",
                "end": "4/2/2018",
                "bordercolor": "#62B58D",
                "color": "#62B58D",
                "id": "9"
            },
            {
                "label": "Idle",
                "processid": "C",
                "start": "1/1/2018",
                "end": "14/1/2018",
                "bordercolor": "#F2726F",
                "color": "#F2726F",
                "id": "10"
            },
            {
                "label": "In Use",
                "processid": "C",
                "start": "14/1/2018",
                "end": "3/2/2018",
                "bordercolor": "#62B58D",
                "color": "#62B58D",
                "id": "11"
            },
            {
                "label": "Idle",
                "processid": "C",
                "start": "3/2/2018",
                "end": "4/2/2018",
                "bordercolor": "#F2726F",
                "color": "#F2726F",
                "id": "12"
            },
            {
                "label": "Repair",
                "processid": "D",
                "start": "1/1/2018",
                "end": "7/1/2018",
                "bordercolor": "#FFC533",
                "color": "#FFC533",
                "id": "13"
            },
            {
                "label": "Idle",
                "processid": "D",
                "start": "7/1/2018",
                "end": "11/1/2018",
                "bordercolor": "#F2726F",
                "color": "#F2726F",
                "id": "14"
            },
            {
                "label": "In Use",
                "processid": "D",
                "start": "11/1/2018",
                "end": "27/1/2018",
                "bordercolor": "#62B58D",
                "color": "#62B58D",
                "id": "15"
            },
            {
                "label": "Repair",
                "processid": "D",
                "start": "27/1/2018",
                "end": "4/2/2018",
                "bordercolor": "#FFC533",
                "color": "#FFC533",
                "id": "16"
            },
            {
                "label": "Idle",
                "processid": "E",
                "start": "1/1/2018",
                "end": "18/1/2018",
                "bordercolor": "#F2726F",
                "color": "#F2726F",
                "id": "17"
            },
            {
                "label": "In Use",
                "processid": "E",
                "start": "18/1/2018",
                "end": "3/2/2018",
                "bordercolor": "#62B58D",
                "color": "#62B58D",
                "id": "18"
            },
            {
                "label": "Idle",
                "processid": "E",
                "start": "3/2/2018",
                "end": "4/2/2018",
                "bordercolor": "#F2726F",
                "color": "#F2726F",
                "id": "19"
            },
            {
                "label": "In Use",
                "processid": "F",
                "start": "1/1/2018",
                "end": "8/1/2018",
                "bordercolor": "#62B58D",
                "color": "#62B58D",
                "id": "20"
            },
            {
                "label": "Repair",
                "processid": "F",
                "start": "8/1/2018",
                "end": "11/1/2018",
                "bordercolor": "#FFC533",
                "color": "#FFC533",
                "id": "21"
            },
            {
                "label": "In Use",
                "processid": "F",
                "start": "11/1/2018",
                "end": "18/1/2018",
                "bordercolor": "#62B58D",
                "color": "#62B58D",
                "id": "22"
            },
            {
                "label": "Repair",
                "processid": "F",
                "start": "18/1/2018",
                "end": "21/1/2018",
                "bordercolor": "#FFC533",
                "color": "#FFC533",
                "id": "23"
            },
            {
                "label": "Idle",
                "processid": "F",
                "start": "21/1/2018",
                "end": "4/2/2018",
                "bordercolor": "#F2726F",
                "color": "#F2726F",
                "id": "24"
            },
            {
                "label": "In Use",
                "processid": "G",
                "start": "1/1/2018",
                "end": "13/1/2018",
                "bordercolor": "#62B58D",
                "color": "#62B58D",
                "id": "25"
            },
            {
                "label": "Idle",
                "processid": "G",
                "start": "13/1/2018",
                "end": "20/1/2018",
                "bordercolor": "#F2726F",
                "color": "#F2726F",
                "id": "26"
            },
            {
                "label": "In Use",
                "processid": "G",
                "start": "20/1/2018",
                "end": "27/1/2018",
                "bordercolor": "#62B58D",
                "color": "#62B58D",
                "id": "27"
            },
            {
                "label": "Repair",
                "processid": "G",
                "start": "27/1/2018",
                "end": "4/2/2018",
                "bordercolor": "#FFC533",
                "color": "#FFC533",
                "id": "28"
            },
            {
                "label": "In Use",
                "processid": "H",
                "start": "1/1/2018",
                "end": "8/1/2018",
                "bordercolor": "#62B58D",
                "color": "#62B58D",
                "id": "29"
            },
            {
                "label": "Idle",
                "processid": "H",
                "start": "8/1/2018",
                "end": "18/1/2018",
                "bordercolor": "#F2726F",
                "color": "#F2726F",
                "id": "30"
            },
            {
                "label": "In Use",
                "processid": "H",
                "start": "18/1/2018",
                "end": "27/1/2018",
                "bordercolor": "#62B58D",
                "color": "#62B58D",
                "id": "31"
            },
            {
                "label": "Repair",
                "processid": "H",
                "start": "27/1/2018",
                "end": "29/1/2018",
                "bordercolor": "#FFC533",
                "color": "#FFC533",
                "id": "32"
            },
            {
                "label": "In Use",
                "processid": "H",
                "start": "29/1/2018",
                "end": "4/2/2018",
                "bordercolor": "#62B58D",
                "color": "#62B58D",
                "id": "33"
            }
        ]
    },
    "processes": {
        "isbold": "1",
        "headertext": "Machines",
        "process": [
            {
                "label": "Machine A",
                "id": "A"
            },
            {
                "label": "Machine B",
                "id": "B"
            },
            {
                "label": "Machine C",
                "id": "C"
            },
            {
                "label": "Machine D",
                "id": "D"
            },
            {
                "label": "Machine E",
                "id": "E"
            },
            {
                "label": "Machine F",
                "id": "F"
            },
            {
                "label": "Machine G",
                "id": "G"
            },
            {
                "label": "Machine H",
                "id": "H"
            }
        ]
    },
    "categories": [
        {
            "category": [
                {
                    "start": "1/1/2018",
                    "end": "4/2/2018",
                    "name": "January 2018"
                }
            ]
        },
        {
            "bgalpha": "0",
            "category": [
                {
                    "start": "1/1/2018",
                    "end": "7/1/2018",
                    "label": "Week 1"
                },
                {
                    "start": "8/1/2018",
                    "end": "14/1/2018",
                    "label": "Week 2"
                },
                {
                    "start": "15/1/2018",
                    "end": "21/1/2018",
                    "label": "Week 3"
                },
                {
                    "start": "22/1/2018",
                    "end": "28/1/2018",
                    "label": "Week 4"
                },
                {
                    "start": "29/1/2018",
                    "end": "4/2/2018",
                    "label": "Week 5"
                }
            ]
        }
    ]
};
var MachinechartComponent = /** @class */ (function () {
    function MachinechartComponent() {
        this.height = 300;
        this.type = 'gantt';
        this.dataFormat = 'json';
        this.dataSource = data;
    }
    MachinechartComponent.prototype.ngOnInit = function () {
    };
    MachinechartComponent = __decorate([
        core_1.Component({
            selector: 'app-machinechart',
            templateUrl: './machinechart.component.html',
            styleUrls: ['./machinechart.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], MachinechartComponent);
    return MachinechartComponent;
}());
exports.MachinechartComponent = MachinechartComponent;
//# sourceMappingURL=machinechart.component.js.map