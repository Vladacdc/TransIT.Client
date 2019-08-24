import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.scss']
})
export class LocalizationComponent {
  language = this.translate.currentLang;
  constructor(private translate: TranslateService) {}

  changeLanguage(lang?: string) {
    this.language = lang ? lang : this.language;
    this.translate.use(this.language);
    localStorage.setItem('language', this.language);
  }
}
