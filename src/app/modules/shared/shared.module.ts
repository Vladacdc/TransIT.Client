import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { GlobalIssueComponent } from './components/global-issue/global-issue.component';
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
import { UniqueFieldValidator } from './validators/unique-field-validator';
import { StatisticsService } from './services/statistics.service';
// Materials
import { MatDatepickerModule,
         MatNativeDateModule,
         MatInputModule,
         MatIconModule,
         MAT_DATE_LOCALE,
         DateAdapter,
         MAT_DATE_FORMATS} from '@angular/material';

import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { lang } from 'moment';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    GlobalIssueComponent,
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
    IssueLogComponent
  ],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    NgBootstrapFormValidationModule,
  ],
  exports: [
    BreadcrumbComponent,
    SupplierComponent,
    CreateSupplierComponent,
    EditSupplierComponent,
    DeleteSupplierComponent,
    NestedDocumentComponent,
    GlobalIssueComponent,
    FiltersTabsComponent,
    GlobalIssueComponent,
    FiltersTabsComponent,
    CreateDocumentComponent,
    DocumentComponent
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
    {provide: MAT_DATE_LOCALE, useValue: "uk-UA"},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class SharedModule {
}
