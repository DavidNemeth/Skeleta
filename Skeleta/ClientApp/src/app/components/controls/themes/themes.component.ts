import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AppTranslationService } from '../../../services/app-translation.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent {

  linkRef: HTMLLinkElement;

  themes = [
    { name: 'Light', href: 'https://unpkg.com/clarity-ui/clarity-ui.min.css' },
    { name: 'Dark', href: 'https://unpkg.com/clarity-ui/clarity-ui-dark.min.css' }
  ];

  constructor(private translationService: AppTranslationService,
    @Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      let theme = this.themes[0];
      try {
        const stored = localStorage.getItem('theme');
        if (stored) {
          theme = JSON.parse(stored);
        }
      } catch (e) {
        // Nothing to do
      }
      this.linkRef = this.document.createElement('link');
      this.linkRef.rel = 'stylesheet';
      this.linkRef.href = theme.href;
      this.document.querySelector('head').appendChild(this.linkRef);
    }
  }

  setTheme(theme) {
    localStorage.setItem('theme', JSON.stringify(theme));
    this.linkRef.href = theme.href;
  }

  changeLanguage(lang: string) {
    console.log(lang);
    switch (lang) {
      case 'hu':
        this.translationService.changeLanguage('hu');
        this.translationService.setDefaultLanguage('hu');
        break;
      case 'en':
        this.translationService.changeLanguage('en');
        this.translationService.setDefaultLanguage('en');
        break;
      default:
        this.translationService.changeLanguage('en');
    }
  }
}
