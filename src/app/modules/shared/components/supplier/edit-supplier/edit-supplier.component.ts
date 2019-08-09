import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Supplier } from '../../../models/supplier';
import { Currency } from '../../../models/currency';
import { Country } from '../../../models/country';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SupplierService } from '../../../services/supplier.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyService } from '../../../services/currency.service';
import { CountryService } from '../../../services/country.service';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss']
})
export class EditSupplierComponent implements OnInit {
  selectedSupplier: Supplier;
  countries: Array<Country>;
  currencies: Array<Currency>;
  country: Country;
  currency: Currency;
  supplierForm: FormGroup;

  @ViewChild('close') closeDiv: ElementRef;
  @ViewChild('selectCountry') selectCountry;
  @Output() updateSupplier = new EventEmitter<Supplier>();
  @Input()
  set supplier(supplier: Supplier) {
    if (!supplier) {
      return;
    }
    this.selectedSupplier = supplier;
    supplier = new Supplier(supplier);
    this.supplierForm.patchValue({...supplier, currency: supplier.currency ? supplier.currency.id : null,
      country: supplier.country ? supplier.country.id : null});
  }

  constructor(
    private currencyService: CurrencyService,
    private countryService: CountryService,
    private formBuilder: FormBuilder,
    private service: SupplierService,
    private toast: ToastrService
    ) {}

   ngOnInit() {
        this.supplierForm = this.formBuilder.group({
      id: [''],
      name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
      fullName: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(100)])),
      edrpou: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(14)])),
      country: [''],
      currency: [''],
   });
        this.countryService.getEntities().subscribe(data => { this.countries = data; });
        this.currencyService.getEntities().subscribe(data => { this.currencies = data; });
        this.selectCountry.select(this.selectedSupplier);
  }

  get Countries(): string[] {
    return this.countries.map(e => e.name);
  }
  get Currencies(): string[] {
    return this.currencies.map(e => e.fullName);
  }

  updateData() {
    if (this.supplierForm.invalid) {
      return;
    }
    this.closeDiv.nativeElement.click();
    const form = this.supplierForm.value;

    let currentCurrency = null;
    this.currencies.forEach(element => {
      if (element.id == form.currency) {
        currentCurrency = element;
      }
    });

    let currentCountry = null;
    this.countries.forEach(element => {
      if (element.id == form.country) {
        currentCountry = element;
      }
    });

    const supplier: Supplier = {
      id: form.id as number,
      name: form.name as string,
      fullName: form.fullName as string,
      edrpou: form.edrpou as string,
      country: currentCountry as Country,
      currency: currentCurrency as Currency
    };
    this.service.updateEntity(supplier).subscribe(_ => {
        this.toast.success('', 'Постачальника оновлено');
        this.updateSupplier.next(supplier);
      },
      error => this.toast.error('Помилка редагування'));
    this.closeDiv.nativeElement.click();
  }

  setCountry(value: Country) {
    this.supplier.country = value;
  }

  setCurrency(value: Currency) {
    this.currency = value;
  }

  setName(value: string) {
    this.supplier.name = value;
  }

  setFullName(value: string) {
    this.supplier.fullName = value;
  }

  setId(value: number) {
    this.supplier.id = value;
  }

  setEdrpou(value: string) {
    this.supplier.edrpou = value;
  }
}
