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
        "caption": "Deaths reported because of insect bites in India",
        "yaxisname": "Number of deaths reported",
        "subcaption": "(As per government records)",
        "plottooltext": "<b>$dataValue</b> people died because of $seriesName in $label",
        "showsum": "0",
        "theme": "fusion"
    },
    "categories": [
        {
            "category": [
                {
                    "label": "1994"
                },
                {
                    "label": "1995"
                },
                {
                    "label": "1996"
                },
                {
                    "label": "1997"
                },
                {
                    "label": "1998"
                },
                {
                    "label": "1999"
                },
                {
                    "label": "2000"
                },
                {
                    "label": "2001"
                },
                {
                    "label": "2002"
                },
                {
                    "label": "2003"
                },
                {
                    "label": "2004"
                },
                {
                    "label": "2005"
                },
                {
                    "label": "2006"
                },
                {
                    "label": "2007"
                },
                {
                    "label": "2008"
                },
                {
                    "label": "2009"
                },
                {
                    "label": "2010"
                },
                {
                    "label": "2011"
                },
                {
                    "label": "2012"
                },
                {
                    "label": "2013"
                },
                {
                    "label": "2014"
                },
                {
                    "label": "2015"
                },
                {
                    "label": "2016"
                },
                {
                    "label": "2017"
                }
            ]
        }
    ],
    "dataset": [
        {
            "seriesname": "Hymenoptera",
            "data": [
                {
                    "value": "15622"
                },
                {
                    "value": "10612"
                },
                {
                    "value": "15820"
                },
                {
                    "value": "26723"
                },
                {
                    "value": "35415"
                },
                {
                    "value": "25555"
                },
                {
                    "value": "81803"
                },
                {
                    "value": "47950"
                },
                {
                    "value": "42396"
                },
                {
                    "value": "19435"
                },
                {
                    "value": "9780"
                },
                {
                    "value": "23243"
                },
                {
                    "value": "28619"
                },
                {
                    "value": "8477"
                },
                {
                    "value": "3503"
                },
                {
                    "value": "14278"
                },
                {
                    "value": "30522"
                },
                {
                    "value": "61518"
                },
                {
                    "value": "24819"
                },
                {
                    "value": "16437"
                },
                {
                    "value": "21171"
                },
                {
                    "value": "1690"
                },
                {
                    "value": "2418"
                },
                {
                    "value": "11253"
                }
            ]
        },
        {
            "seriesname": "Diptera",
            "data": [
                {
                    "value": "36220"
                },
                {
                    "value": "26120"
                },
                {
                    "value": "58200"
                },
                {
                    "value": "67203"
                },
                {
                    "value": "54015"
                },
                {
                    "value": "55505"
                },
                {
                    "value": "18003"
                },
                {
                    "value": "79050"
                },
                {
                    "value": "20396"
                },
                {
                    "value": "94035"
                },
                {
                    "value": "27080"
                },
                {
                    "value": "32043"
                },
                {
                    "value": "86019"
                },
                {
                    "value": "14707"
                },
                {
                    "value": "15003"
                },
                {
                    "value": "40278"
                },
                {
                    "value": "95022"
                },
                {
                    "value": "25018"
                },
                {
                    "value": "40819"
                },
                {
                    "value": "64037"
                },
                {
                    "value": "61071"
                },
                {
                    "value": "26090"
                },
                {
                    "value": "14018"
                },
                {
                    "value": "12053"
                }
            ]
        }
    ]
};
var FusionComponent = /** @class */ (function () {
    function FusionComponent() {
        this.width = "100%";
        this.height = "400";
        this.type = 'stackedcolumn3dline';
        this.dataFormat = 'json';
        this.dataSource = data;
        this.title = "Angular  FusionCharts Sample";
    }
    FusionComponent.prototype.ngOnInit = function () {
    };
    FusionComponent = __decorate([
        core_1.Component({
            selector: 'app-fusion',
            templateUrl: './fusion.component.html',
            styleUrls: ['./fusion.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], FusionComponent);
    return FusionComponent;
}());
exports.FusionComponent = FusionComponent;
//# sourceMappingURL=fusion.component.js.map