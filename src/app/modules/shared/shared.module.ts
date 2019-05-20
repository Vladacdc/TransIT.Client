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

@NgModule({
  declarations: [
    GlobalIssueComponent,
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
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    NgBootstrapFormValidationModule
  ],
  exports: [
    NestedDocumentComponent,
    GlobalIssueComponent,
    FiltersTabsComponent,
    GlobalIssueComponent,
    FiltersTabsComponent,
    CreateDocumentComponent,
    DocumentComponent
  ]
})
export class SharedModule {}
