import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineerComponent } from './components/engineer/engineer.component';
import { IssuesComponent } from './components/issues/issues.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { EditIssueComponent } from './components/issues/edit-issue/edit-issue.component';
import { SharedModule } from '../shared/shared.module';
import { GlobalDocumentComponent } from '../shared/components/global-document/global-document.component';
import { IssueLogComponent } from '../shared/components/issue-log/issue-log.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { IssueLogsComponent } from './components/issue-log-components/issue-logs/issue-logs.component';
import { EditIssueLogComponent } from './components/issue-log-components/edit-issue-log/edit-issue-log.component';
import { NestedIssueLogsComponent } from './components/issue-log-components/nested-issue-logs/nested-issue-logs.component';
import { IssueLogDocumentsComponent } from './components/issue-log-components/issue-log-documents/issue-log-documents.component';
import { DocumentComponent } from '../shared/components/global-document/document/document.component';
import { SupplierComponent } from '../shared/components/supplier/supplier.component';
import { CreateDocumentComponent } from './components/create-document/create-document.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { MatTableModule, MatInputModule, MatFormFieldModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { InfoVehicleComponent } from './components/vehicles/info-vehicle/info-vehicle.component';

const routes: Routes = [
  {
    path: '',
    component: EngineerComponent,
    children: [
      { path: 'issues', component: IssuesComponent },
      { path: 'issues/edit', component: EditIssueComponent },
      { path: 'issue-logs', component: IssueLogsComponent },
      { path: 'issue-logs/edit', component: EditIssueLogComponent },
      { path: 'issue-logs/documents', component: DocumentComponent },
      { path: 'documents', component: GlobalDocumentComponent },
      { path: 'supplier', component: SupplierComponent},
      { path: 'issue-log', component: IssueLogComponent },
      { path: 'vehicles', component: VehiclesComponent},
      { path: 'info-vehicle', component: InfoVehicleComponent},
      { path: '**', redirectTo: 'issues' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule,
    NgSelectModule
  ],
  exports: [RouterModule],
  declarations: [
    EditIssueComponent,
    EditIssueLogComponent,
    NestedIssueLogsComponent,
    IssueLogDocumentsComponent,
    CreateDocumentComponent,
    VehiclesComponent,
    InfoVehicleComponent
  ]
})
export class EngineerRoutingModule {}

@NgModule({
  declarations: [EngineerComponent, IssuesComponent, IssueLogsComponent],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    CoreModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    EngineerRoutingModule
  ]
})
export class EngineerModule {}
