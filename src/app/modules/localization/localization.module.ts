import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { HttpClient } from '@angular/common/http';
import { LanguageSelectComponent } from './language-select/language-select.component';
import { CommonModule } from '@angular/common';
import { MatSelectModule, DateAdapter } from '@angular/material';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new MultiTranslateHttpLoader(httpClient, [
        {prefix: './assets/translate/core/', suffix: '.json'},
        {prefix: './assets/translate/', suffix: '.json'},
        {prefix: './assets/translate/routing/', suffix: '.json'},
        {prefix: './assets/translate/shared/unit/', suffix: '.json'},
        {prefix: './assets/translate/shared/manufacturer/', suffix: '.json'},
        {prefix: './assets/translate/shared/filter-tab/', suffix: '.json'},
        {prefix: './assets/translate/admin/parts/', suffix: '.json'},
        {prefix: './assets/translate/shared/paginator-extentions/mat-paginator-intl-custom/', suffix: '.json'},
        {prefix: './assets/translate/shared/components/tables/mat-fsp-table/', suffix: '.json'},
        {prefix: './assets/translate/shared/components/dictionaries/part-in/', suffix: '.json'}
    ]);
  }

@NgModule({
    declarations: [LanguageSelectComponent],
    imports: [
        CommonModule,
        MatSelectModule,
        TranslateModule.forChild({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          })
    ],
    exports: [LanguageSelectComponent, TranslateModule]
})

export class LocalizationModule {
    constructor(
      public translate: TranslateService,
      private adapter: DateAdapter<any>) {
        this.ConfigureTranslation();
    }
    private ConfigureTranslation() {
        this.translate.addLangs(['en', 'uk']);
        this.translate.setDefaultLang('uk');
        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
          localStorage.setItem('language', event.lang);
          this.adapter.setLocale(event.lang);
        });

        let language = this.translate.getDefaultLang();
        const storedLanguage = localStorage.getItem('language');
        const browserLanguage = this.translate.getBrowserLang();
        if (storedLanguage != null && storedLanguage.match(/en|uk/)) {
          language = storedLanguage;
        } else if (browserLanguage.match(/en|uk/)) {
          language = browserLanguage;
        }

        this.translate.use(language);
      }
}
