import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { HttpAuthInterceptor } from './interceptors/http-auth.interceptor';
import { AdminnavbarComponent } from './components/navbar/adminnavbar/adminnavbar.component';

@NgModule({
  declarations: [HomeComponent, NavbarComponent, LoginComponent, AdminnavbarComponent],
  imports: [CommonModule, NgbModule, ReactiveFormsModule, RouterModule, NgBootstrapFormValidationModule, HttpClientModule],
  exports: [HomeComponent, NavbarComponent, LoginComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true }
  ]
})
export class CoreModule {}
