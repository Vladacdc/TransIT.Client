import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import {AdminModule} from './modules/admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CreateUserComponent} from './modules/admin/component/create-user/create-user.component';
import {MatButtonModule} from '@angular/material';
import {DialogComponent} from './modules/admin/component/dialog/dialog.component';
import { CoreModule } from './modules/core/core.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AdminModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    NgBootstrapFormValidationModule.forRoot(),
    ToastrModule.forRoot(),
    NgxSpinnerModule
  ],
  entryComponents: [CreateUserComponent, DialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
