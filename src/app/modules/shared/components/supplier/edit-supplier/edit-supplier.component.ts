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
  oldSupplier: Supplier;
  selectedSupplier: Supplier;
  countries: Array<Country>;
  currencies: Array<Currency>;
  supplierForm: FormGroup;

  @ViewChild('close') closeDiv: ElementRef;
  @Output() updateSupplier = new EventEmitter<Supplier>();
  @Input()
  set supplier(supplier: Supplier) {
    if (!supplier) {
      return;
    }
    this.oldSupplier = new Supplier(supplier);
    this.selectedSupplier = new Supplier(supplier);
    this.supplierForm.patchValue(this.selectedSupplier);
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
      fullName: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(60)])),
      edrpou: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(14)])),
      country: [''],
      currency: ['']
    });
    this.countryService.getEntities().subscribe(data => {
      this.countries = data;
    });
    this.currencyService.getEntities().subscribe(data => {
      this.currencies = data;
    });
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

    const supplier: Supplier = {
      id: this.selectedSupplier.id,
      name: this.selectedSupplier.name,
      fullName: this.selectedSupplier.fullName,
      edrpou: this.selectedSupplier.edrpou,
      currency: this.selectedSupplier.currency,
      country: this.selectedSupplier.country
    };

    this.service.updateEntity(supplier).subscribe(
      _ => {
        this.toast.success('', 'Постачальника оновлено');
        this.updateSupplier.next(supplier);
      },
      error => this.toast.error('Помилка редагування')
    );
    this.closeDiv.nativeElement.click();
  }

  setCountry(value: Country) {
    this.selectedSupplier.country = value;
  }

  setCurrency(value: Currency) {
    this.selectedSupplier.currency = value;
  }

  setName(event) {
    this.selectedSupplier.name = event.target.value;
  }

  setFullName(event) {
    this.selectedSupplier.fullName = event.target.value;
  }

  setEdrpou(event) {
    this.selectedSupplier.edrpou = event.target.value;
  }

  resetForm() {
    this.supplierForm.patchValue(this.oldSupplier);
  }
}
