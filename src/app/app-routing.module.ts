import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './modules/admin/component/admin/admin.component';
import {BrowserModule} from '@angular/platform-browser';

const routes: Routes = [
 // {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'admin', component: AdminComponent}
];
@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)
  ],
  declarations: [AdminComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
