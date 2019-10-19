import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CountryComponent } from './components/dictionaries/country/country.component';
import { DictionaryComponent } from './components/dictionaries/dictionary.component';
import { CurrencyComponent } from './components/dictionaries/currency/currency.component';
import { DeleteCountryComponent } from './components/dictionaries/country/delete-country/delete-country.component';
import { CreateCurrencyComponent } from './components/dictionaries/currency/create-currency/create-currency.component';
import { DeleteCurrencyComponent } from './components/dictionaries/currency/delete-currency/delete-currency.component';
import { CreateCountryComponent } from './components/dictionaries/country/create-country/create-country.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltersTabsComponent } from './components/filters-tabs/filters-tabs.component';
import { GlobalDocumentComponent } from './components/global-document/global-document.component';
import { DocumentComponent } from './components/global-document/document/document.component';
import { CreateDocumentComponent } from './components/global-document/document/create-document/create-document.component';
import { DeleteDocumentComponent } from './components/global-document/document/delete-document/delete-document.component';
import { EditDocumentComponent } from './components/global-document/document/edit-document/edit-document.component';
import { NestedDocumentComponent } from './components/global-document/document/nested-document/nested-document.component';
import { IssueLogComponent } from './components/issue-log/issue-log.component';
import { CoreModule } from '../core/core.module';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { SupplierComponent } from './components/supplier/supplier.component';
import { CreateSupplierComponent } from './components/supplier/create-supplier/create-supplier.component';
import { EditSupplierComponent } from './components/supplier/edit-supplier/edit-supplier.component';
import { DeleteSupplierComponent } from './components/supplier/delete-supplier/delete-supplier.component';
import { ActionTypeService } from './services/action-type.service';
import { CurrencyService } from './services/currency.service';
import { DocumentService } from './services/document.service';
import { EmployeeService } from './services/employee.service';
import { IssueService } from './services/issue.service';
import { MalfunctionGroupService } from './services/malfunction-group.service';
import { MalfunctionSubgroupService } from './services/malfunction-subgroup.service';
import { MalfunctionService } from './services/malfunction.service';
import { IssuelogService } from './services/issuelog.service';
import { PostService } from './services/post.service';
import { RoleService } from './services/role.service';
import { StateService } from './services/state.service';
import { UserService } from './services/user.service';
import { VehicleTypeService } from './services/vehicle-type.service';
import { VehicleService } from './services/vehicle.service';
import { SupplierService } from './services/supplier.service';
import { TransitionService } from './services/transition.service';
import { CountryService } from './services/country.service';
import { StatisticsService } from './services/statistics.service';
import { UnitService } from './services/unit.service';
import { MatTableExporterModule } from 'mat-table-exporter';
// Materials
import { MatDatepickerModule,
         MatNativeDateModule,
         MatInputModule,
         MatTableModule,
         MatPaginatorModule,
         MatSortModule,
         MatProgressSpinnerModule,
         MatIconModule,
         DateAdapter,
         MAT_DATE_LOCALE,
         MAT_DATE_FORMATS } from '@angular/material';

import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MatFspTableComponent } from './components/tables/mat-fsp-table/mat-fsp-table.component';
import { EntitiesDataSource } from './data-sources/entities-data-sourse';
import { UnitComponent } from './components/dictionaries/unit/unit.component';
import { CreateUnitComponent } from './components/dictionaries/unit/create-unit/create-unit.component';
import { DeleteUnitComponent } from './components/dictionaries/unit/delete-unit/delete-unit.component';
import { EditUnitComponent } from './components/dictionaries/unit/edit-unit/edit-unit.component';
import { ManufacturerComponent } from './components/dictionaries/manufacturer/manufacturer.component';
import { CreateManufacturerComponent } from './components/dictionaries/manufacturer/create-manufacturer/create-manufacturer.component';
import { DeleteManufacturerComponent } from './components/dictionaries/manufacturer/delete-manufacturer/delete-manufacturer.component';
import { EditManufacturerComponent } from './components/dictionaries/manufacturer/edit-manufacturer/edit-manufacturer.component';
import { WorkTypeComponent } from './components/dictionaries/workType/work-type.component';
import { WorkTypeService } from './services/work-type.service';
import { CreateWorkTypeComponent } from './components/dictionaries/workType/create-work-type/create-work-type.component';
import { EditWorkTypeComponent } from './components/dictionaries/workType/edit-work-type/edit-work-type.component';
import { DeleteWorkTypeComponent } from './components/dictionaries/workType/delete-work-type/delete-work-type.component';
import { EntitiesDataSourceForVehicle } from './data-sources/entities-data-source-for-vehicle';
import { PartService } from './services/part.service';
import { ManufacturerService } from './services/manufacturer.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { IssueComponent } from './components/issue/issue.component';
import { IssueDetailsComponent } from './components/issue/issue-details/issue-details.component';
import { CreateIssueComponent } from './components/issue/create-issue/create-issue.component';
import { EditIssueComponent } from '../engineer/components/edit-issue/edit-issue.component';
import { DeleteIssueComponent } from './components/issue/delete-issue/delete-issue.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    SupplierComponent,
    CreateSupplierComponent,
    EditSupplierComponent,
    DeleteSupplierComponent,
    CountryComponent,
    DictionaryComponent,
    CurrencyComponent,
    CreateCountryComponent,
    DeleteCountryComponent,
    CreateCurrencyComponent,
    DeleteCurrencyComponent,
    FiltersTabsComponent,
    GlobalDocumentComponent,
    DocumentComponent,
    CreateDocumentComponent,
    DeleteDocumentComponent,
    EditDocumentComponent,
    NestedDocumentComponent,
    IssueLogComponent,
    MatFspTableComponent,
    UnitComponent,
    DeleteUnitComponent,
    EditUnitComponent,
    CreateUnitComponent,
    ManufacturerComponent,
    CreateManufacturerComponent,
    DeleteManufacturerComponent,
    EditManufacturerComponent,
    WorkTypeComponent,
    CreateWorkTypeComponent,
    EditWorkTypeComponent,
    DeleteWorkTypeComponent,
    IssueComponent,
    CreateIssueComponent,
    DeleteIssueComponent,
    IssueDetailsComponent,
  ],
  imports: [
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    NgBootstrapFormValidationModule,
    RouterModule,
    MatTableExporterModule
  ],
  exports: [
    BreadcrumbComponent,
    SupplierComponent,
    CreateSupplierComponent,
    EditSupplierComponent,
    DeleteSupplierComponent,
    NestedDocumentComponent,
    FiltersTabsComponent,
    CreateDocumentComponent,
    DocumentComponent,
    MatFspTableComponent,
    UnitComponent,
    DeleteUnitComponent,
    EditUnitComponent,
    CreateUnitComponent,
    ManufacturerComponent,
    CreateManufacturerComponent,
    DeleteManufacturerComponent,
    EditManufacturerComponent,
    WorkTypeComponent,
    IssueComponent,
  ],
  providers: [
    ActionTypeService,
    CountryService,
    CurrencyService,
    DocumentService,
    EmployeeService,
    IssueService,
    IssuelogService,
    MalfunctionGroupService,
    MalfunctionSubgroupService,
    MalfunctionService,
    PostService,
    RoleService,
    StateService,
    SupplierService,
    TransitionService,
    UserService,
    VehicleTypeService,
    VehicleService,
    StatisticsService,
    EntitiesDataSource,
    EntitiesDataSourceForVehicle,
    WorkTypeService,
    PartService,
    ManufacturerService,
    UnitService,
    ManufacturerService,
    PartService,
    {provide: MAT_DATE_LOCALE, useValue: localStorage.getItem('language')},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},

  ]
})
export class SharedModule {
}
