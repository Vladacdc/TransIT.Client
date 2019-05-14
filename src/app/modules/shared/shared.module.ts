import { NgModule } from '@angular/core';
import { GlobalIssueComponent } from './components/global-issue/global-issue.component';
import { CountryComponent } from './components/dictionaries/country/country.component';
import { DictionaryComponent } from './components/dictionaries/dictionary.component';
import { CurrencyComponent } from './components/dictionaries/currency/currency.component';
import { DeleteCountryComponent } from './components/dictionaries/country/delete-country/delete-country.component';
import { CreateCurrencyComponent } from './components/dictionaries/currency/create-currency/create-currency.component';
import { DeleteCurrencyComponent } from './components/dictionaries/currency/delete-currency/delete-currency.component';
import { CommonModule } from '@angular/common';
import { CreateCountryComponent } from './components/dictionaries/country/create-country/create-country.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltersTabsComponent } from './components/filters-tabs/filters-tabs.component';

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
    FiltersTabsComponent
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [GlobalIssueComponent]
})
export class SharedModule {}
