import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Supplier } from 'src/app/modules/shared/models/supplier';
import { SupplierService } from 'src/app/modules/shared/services/supplier.service';
import { ToastrService } from 'ngx-toastr';
import { CountryService } from '../../../services/country.service';
import { Country } from '../../../models/country';
import { Currency } from '../../../models/currency';
import { CurrencyService } from '../../../services/currency.service';


@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss']
})
export class CreateSupplierComponent implements OnInit {
  supplierForm: FormGroup;
  countries: Array<Country>;
  currencies:Array<Currency>;
  @ViewChild('close') closeCreateModal: ElementRef;
  @Output() createSupplier = new EventEmitter<Supplier>();

  constructor(
    private currencyService:CurrencyService,
    private countryService: CountryService,
    private service: SupplierService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    $('#createSupplier').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .trigger('reset');
    });
    this.supplierForm = this.formBuilder.group({
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

  clickSubmit() {
    if (this.supplierForm.invalid) {
      return;
    }
    const form = this.supplierForm.value;
    const supplier: Supplier = {
      id: 0,
      name: form.name as string,
      fullName: form.fullName as string,
      edrpou: form.edrpou as string,
      currency: form.currency as Currency,
      country: form.country as Country,
    };
    
    this.service.addEntity(supplier).subscribe(newGroup => this.createSupplier.next(newGroup));
    this.closeCreateModal.nativeElement.click();
  }
}
