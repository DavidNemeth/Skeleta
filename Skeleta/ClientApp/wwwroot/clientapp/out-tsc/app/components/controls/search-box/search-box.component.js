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
var SearchBoxComponent = /** @class */ (function () {
    function SearchBoxComponent() {
        this.placeholder = 'Search...';
        this.searchChange = new core_1.EventEmitter();
    }
    SearchBoxComponent.prototype.onValueChange = function (value) {
        var _this = this;
        setTimeout(function () { return _this.searchChange.emit(value); });
    };
    SearchBoxComponent.prototype.clear = function () {
        this.searchInput.nativeElement.value = '';
        this.onValueChange(this.searchInput.nativeElement.value);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SearchBoxComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], SearchBoxComponent.prototype, "searchChange", void 0);
    __decorate([
        core_1.ViewChild('searchInput'),
        __metadata("design:type", core_1.ElementRef)
    ], SearchBoxComponent.prototype, "searchInput", void 0);
    SearchBoxComponent = __decorate([
        core_1.Component({
            selector: 'app-search-box',
            templateUrl: './search-box.component.html',
            styleUrls: ['./search-box.component.css']
        })
    ], SearchBoxComponent);
    return SearchBoxComponent;
}());
exports.SearchBoxComponent = SearchBoxComponent;
//# sourceMappingURL=search-box.component.js.map