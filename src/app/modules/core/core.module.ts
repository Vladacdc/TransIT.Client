import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { HttpAuthInterceptor } from './interceptors/http-auth.interceptor';
import { CrudService } from './services/crud.service';
import { SpinnerService } from './services/spinner.service';
import { TruncatePipe } from './pipes/truncate.pipe';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ValidatorComponent } from './components/validator/validator.component';
import { LocalizationModule } from '../localization/localization.module';

@NgModule({
  declarations: [
    NavbarComponent,
    ValidatorComponent,
    LoginComponent,
    TruncatePipe,
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
    LocalizationModule
  ],
  exports: [
    NavbarComponent,
    ValidatorComponent,
    LoginComponent,
    TruncatePipe,
    LocalizationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
    CrudService,
    SpinnerService
  ]
})
export class CoreModule {
  constructor() {
  }
}
