import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Supplier } from '../../../models/supplier';
import { Currency } from '../../../models/currency';
import { Country } from '../../../models/country';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SupplierService } from '../../../services/supplier.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyService } from '../../../services/currency.service';
import { CountryService } from '../../../services/country.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss']
})
export class EditSupplierComponent implements OnInit {
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
    this.selectedSupplier = new Supplier(supplier);
    if (this.supplierForm) {
      this.resetForm();
    }
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
    this.supplierForm.patchValue(this.selectedSupplier);

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
    const form = this.supplierForm.value;
    const supplier: Supplier = {
      id: form.id as number,
      name: form.name as string,
      fullName: form.fullName as string,
      edrpou: form.edrpou as string,
      currency: form.currency as Currency,
      country: form.country as Country
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

  resetForm() {
    this.supplierForm.patchValue(this.selectedSupplier);
  }
}
