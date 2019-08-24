import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.scss']
})
export class LocalizationComponent {
    constructor(private translate: TranslateService) {
    }

    setLanguage(lang: string) {
      this.translate.use(lang);
      localStorage.setItem('language', lang);
    }
}
