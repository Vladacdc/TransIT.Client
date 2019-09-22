import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from 'src/app/modules/shared/services/supplier.service';
import { Supplier } from 'src/app/modules/shared/models/supplier';
import { EntitiesDataSource } from '../../data-sources/entities-data-sourse';
import { MatFspTableComponent } from '../tables/mat-fsp-table/mat-fsp-table.component';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CountryService } from 'src/app/modules/shared/services/country.service';
import { Country } from 'src/app/modules/shared/models/country';
import { Currency } from 'src/app/modules/shared/models/currency';
import { CurrencyService } from 'src/app/modules/shared/services/currency.service';
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  supplier: Supplier;

  countries: Array<Country>;
  currencies: Array<Currency>;

  columnDefinitions: string[] = [
    'name',
    'fullName',
    'countryName',
    'currencyFullName',
    'edrpou'
  ];
  columnNames: string[] = [
    'Коротка назва',
    'Повна назва',
    'Країна',
    'Валюта',
    'ЄДРПОУ'
  ];

  @ViewChild('table') table: MatFspTableComponent;
  @ViewChild('actionsTemplate') actionsTemplate: any;
  @ViewChild('generalTemplate') generalTemplate: any;

  messageForCreate: 'Створити постачальника';

  dataSource: EntitiesDataSource<Supplier>;

  constructor(
    private supplierService: SupplierService,
    private authenticationService: AuthenticationService,
    private currencyService: CurrencyService,
    private countryService: CountryService,
    private formBuilder: FormBuilder
  ) {
  }

  supplierForm = this.formBuilder.group({
    name: ['', Validators.required],
    fullName: ['', Validators.required],
    edrpou: [''],
    country: [''],
    currency: [''],
  });

  controls: any[] = [
    {
      containerType: 'input',
      formControlName: 'name',
      placeHolder: 'Введіть скорочену назву',
      labelName: 'Коротка назва',
      required: true
    },
    {
      containerType: 'input',
      formControlName: 'fullName',
      placeHolder: 'Введіть повну назву',
      labelName: 'Повна назва',
      required: true
    },
    {
      containerType: 'input',
      formControlName: 'edrpou',
      placeHolder: 'Введіть ЄДРПОУ',
      labelName: 'ЄДРПОУ',
      required: true
    },
    {
      containerType: 'select',
      formControlName: 'country',
      placeHolder: 'Виберіть Країну',
      labelName: 'ЄДРПОУ',
      required: true,
      bindLabel: 'name',
      items: this.countries
    },
    {
      containerType: 'select',
      formControlName: 'currency',
      placeHolder: 'Виберіть Валюту',
      labelName: 'Валюта',
      required: true,
      bindLabel: 'fullName',
      items: this.currencies
    },
  ];

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Supplier>(this.supplierService);

    if (this.authenticationService.getRole() === 'ADMIN') {
      this.table.actionContentTemplate = this.actionsTemplate;
      this.table.generalContentTemplate = this.generalTemplate;
    }
  }

  refreshTable() {
    this.table.loadEntitiesPage();
  }

  clickSubmit(formValue: FormGroup) {
    if (formValue.invalid) {
      return;
    }
    const form = formValue.value;
    const supplier: Supplier = {
      id: 0,
      name: form.name as string,
      fullName: form.fullName as string,
      edrpou: form.edrpou as string,
      currency: form.currency as Currency,
      country: form.country as Country,
    };

    this.supplierService.addEntity(supplier).subscribe(() => this.refreshTable());
  }


  loadData()
  {
    this.countryService.getEntities().subscribe(data => {
      this.countries = data;
    });
    this.currencyService.getEntities().subscribe(data => {
      this.currencies = data;
    });
  }
}
