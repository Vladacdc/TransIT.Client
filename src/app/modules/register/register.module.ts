import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { RegisterRoutingModule } from './register-routing.module';
import { CoreModule } from '../core/core.module';

import { RegisterComponent } from './components/register/register.component';
import { IssuesComponent } from './components/issues/issues.component';
import { CreateIssueComponent } from './components/create-issue/create-issue.component';
import { IssueDetailsComponent } from './components/issue-details/issue-details.component';

@NgModule({
  declarations: [
    RegisterComponent,
    IssuesComponent,
    CreateIssueComponent,
    IssueDetailsComponent,
    IssueDetailsComponent
  ],
  imports: [CommonModule, RegisterRoutingModule, CoreModule, ReactiveFormsModule, NgBootstrapFormValidationModule]
})
export class RegisterModule {}
