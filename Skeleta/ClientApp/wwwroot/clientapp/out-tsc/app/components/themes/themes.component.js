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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var app_translation_service_1 = require("../../services/app-translation.service");
var ThemesComponent = /** @class */ (function () {
    function ThemesComponent(translationService, document, platformId) {
        this.translationService = translationService;
        this.document = document;
        this.platformId = platformId;
        this.themes = [
            { name: 'Light', href: "https://unpkg.com/clarity-ui/clarity-ui.min.css" },
            { name: 'Dark', href: "https://unpkg.com/clarity-ui/clarity-ui-dark.min.css" }
        ];
        if (common_1.isPlatformBrowser(this.platformId)) {
            var theme = this.themes[0];
            try {
                var stored = localStorage.getItem('theme');
                if (stored) {
                    theme = JSON.parse(stored);
                }
            }
            catch (e) {
                // Nothing to do
            }
            this.linkRef = this.document.createElement('link');
            this.linkRef.rel = 'stylesheet';
            this.linkRef.href = theme.href;
            this.document.querySelector('head').appendChild(this.linkRef);
        }
        if (this.translationService.getBrowserLanguage() == 'en') {
            this.language = 'hu';
        }
        else
            this.language = 'en';
    }
    ThemesComponent.prototype.setTheme = function (theme) {
        localStorage.setItem('theme', JSON.stringify(theme));
        this.linkRef.href = theme.href;
    };
    ThemesComponent.prototype.changeLanguage = function (lang) {
        console.log(lang);
        switch (lang) {
            case 'hu':
                this.translationService.changeLanguage('hu');
                this.language = "en";
                break;
            case 'en':
                this.translationService.changeLanguage('en');
                this.language = "hu";
                break;
            default:
                this.translationService.changeLanguage('en');
                this.language = "en";
        }
    };
    ThemesComponent = __decorate([
        core_1.Component({
            selector: 'app-themes',
            templateUrl: './themes.component.html',
            styleUrls: ['./themes.component.css']
        }),
        __param(1, core_1.Inject(common_1.DOCUMENT)), __param(2, core_1.Inject(core_1.PLATFORM_ID)),
        __metadata("design:paramtypes", [app_translation_service_1.AppTranslationService,
            Document, Object])
    ], ThemesComponent);
    return ThemesComponent;
}());
exports.ThemesComponent = ThemesComponent;
//# sourceMappingURL=themes.component.js.map