import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { IssuesComponent } from './components/issues/issues.component';
import { CoreModule } from '../core/core.module';
import { CreateIssueComponent } from './components/create-issue/create-issue.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

@NgModule({
  declarations: [RegisterComponent, IssuesComponent, CreateIssueComponent],
  imports: [CommonModule, RegisterRoutingModule, CoreModule, ReactiveFormsModule, NgBootstrapFormValidationModule]
})
export class RegisterModule {}
