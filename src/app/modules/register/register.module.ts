import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { RegisterRoutingModule } from './register-routing.module';
import { CoreModule } from '../core/core.module';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { RegisterComponent } from './components/register/register.component';
import { IssuesComponent } from './components/issues/issues.component';
import { CreateIssueComponent } from './components/issues/create-issue/create-issue.component';
import { IssueDetailsComponent } from './components/issues/issue-details/issue-details.component';
import { DeleteIssueComponent } from './components/issues/delete-issue/delete-issue.component';
import { SharedModule } from '../shared/shared.module';
import { MatDatepickerModule } from '@angular/material';

@NgModule({
  declarations: [RegisterComponent, IssuesComponent, CreateIssueComponent, IssueDetailsComponent, DeleteIssueComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    DataTablesModule,
    NgSelectModule,
    FormsModule,
    SharedModule,
    MatDatepickerModule
  ]
})
export class RegisterModule {}
