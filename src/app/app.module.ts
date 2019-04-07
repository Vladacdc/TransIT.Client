import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AdminModule} from './modules/admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CreateUserComponent} from './modules/admin/component/create-user/create-user.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  entryComponents: [CreateUserComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
