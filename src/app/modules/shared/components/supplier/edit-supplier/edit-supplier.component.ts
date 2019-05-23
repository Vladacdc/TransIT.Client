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
    this.selectedSupplier=supplier;
    supplier = new Supplier(supplier);
    this.supplierForm.patchValue({...supplier, currency: supplier.currency.fullName, country: supplier.country.name});
  };

  constructor(
    private currencyService: CurrencyService,
    private countryService: CountryService,
    private formBuilder: FormBuilder, 
    private service: SupplierService, 
    private toast: ToastrService
    ) {}
  
   ngOnInit() {
    $('#editSupplier').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .trigger('reset');
    });
    this.supplierForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      fullName: ['', Validators.required],
      edrpou: [''],
      country: [''],
      currency: [''],
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
    this.closeDiv.nativeElement.click();
    const form = this.supplierForm.value;

    const supplier: Supplier = {
      id: form.id as number,
      name: form.name as string,
      fullName: form.fullName as string,
      edrpou: form.edrpou as string,
      country: form.country as Country,
      currency: form.currency as Currency
    };

    this.service.updateEntity(supplier).subscribe(_ => this.updateSupplier.next(supplier));
    this.closeDiv.nativeElement.click();
  }
}

