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
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new MultiTranslateHttpLoader(httpClient, [
      {prefix: './assets/translate/core/', suffix: '.json'},
      {prefix: './assets/translate/', suffix: '.json'}
  ]);
}

@NgModule({
  declarations: [NavbarComponent, LoginComponent, TruncatePipe, LocalizationComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgBootstrapFormValidationModule, HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [NavbarComponent, LoginComponent, TruncatePipe, LocalizationComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
    CrudService,
    SpinnerService
  ]
})
export class CoreModule {
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'ua']);
    translate.setDefaultLang('ua');
    let language = translate.getDefaultLang();
    if (localStorage.getItem('language').match(/en|ua/)) {
      language = localStorage.getItem('language');
    } else if (translate.getBrowserLang().match(/en|ua/)) {
      language = translate.getBrowserLang();
    }

    translate.use(language);
    localStorage.setItem('language', language);
  }
}
