import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { HttpAuthInterceptor } from './interceptors/http-auth.interceptor';
import { CrudService } from './services/crud.service';
import { SpinnerService } from './services/spinner.service';
import { TruncatePipe } from './pipes/truncate.pipe';

import { LocalizationComponent } from './components/localization/localization.component';
import { TranslateModule, TranslateLoader, TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ValidatorComponent } from './components/validator/validator.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new MultiTranslateHttpLoader(httpClient, [
      {prefix: './assets/translate/core/', suffix: '.json'},
      {prefix: './assets/translate/', suffix: '.json'}
  ]);
}

@NgModule({
  declarations: [
    NavbarComponent,
    ValidatorComponent,
    LoginComponent,
    TruncatePipe,
    LocalizationComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    NgBootstrapFormValidationModule,
    HttpClientModule,
    MatSelectModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    NavbarComponent,
    ValidatorComponent,
    LoginComponent,
    TruncatePipe,
    LocalizationComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
    CrudService,
    SpinnerService
  ]
})
export class CoreModule {
  constructor(public translate: TranslateService) {
    this.ConfigureTranslation();
  }

  private ConfigureTranslation() {
    this.translate.addLangs(['en', 'ua']);
    this.translate.setDefaultLang('ua');
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      localStorage.setItem('language', event.lang);
    });

    let language = this.translate.getDefaultLang();
    const storedLanguage = localStorage.getItem('language');
    const browserLanguage = this.translate.getBrowserLang();
    if (storedLanguage != null && storedLanguage.match(/en|ua/)) {
      language = storedLanguage;
    } else if (browserLanguage.match(/en|ua/)) {
      language = browserLanguage;
    }

    this.translate.use(language);
  }
}
