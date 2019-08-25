import { Component, ViewChild, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TEntity } from 'src/app/modules/core/models/entity/entity';

import { SupplierService } from 'src/app/modules/shared/services/supplier.service';
import { CountryService } from 'src/app/modules/shared/services/country.service';
import { CurrencyService } from  'src/app/modules/shared/services/currency.service';

import { Supplier } from 'src/app/modules/shared/models/supplier';
import { Country } from 'src/app/modules/shared/models/country';
import { Currency } from 'src/app/modules/shared/models/currency';


@Component({
  selector: 'app-global-modal',
  templateUrl: './global-modal.component.html',
  styleUrls: ['./global-modal.component.scss']
})
export class GlobalModalComponent implements OnInit {
  @ViewChild('close') closeModal: ElementRef;
  @Input() entity: TEntity<any>;
  @Output() outputEntity = new EventEmitter<TEntity<any>>();

  constructor(private formBuilder: FormBuilder,
              private supplierService: SupplierService,
              private currencyService:CurrencyService,
              private countryService: CountryService,
              private toast: ToastrService
             ) { }

    generalFormBody: FormGroup;
    generalFormFooter: FormGroup;

    selectedEntity:TEntity<any>;

    message:string;

    countries: Array<Country>;
    currencies:Array<Currency>;

    ngOnInit() {      
      $('#globalModal').on('hidden.bs.modal', function() {
        $(this)
          .find('form')
          .trigger('reset');
      });

      this.generalFormBody = this.formBuilder.group({
        id:[''],
        name: ['', Validators.required],
        fullName: ['', Validators.required],
        edrpou: [''],
        country: [''],
        currency: [''],
      });
    
      this.generalFormFooter = this.formBuilder.group({  
        cancelButton: [''],
        deleteButton: [''],
      });
switch(this.modalTypes[0].type)
{
case "delete":this.message="Ви дійсно хочете видалити постачальника?";
case "create":this.message="Створити постачальника";
case "edit":this.message="Редагувати постачальника";
}


this.countryService.getEntities().subscribe(data => {
  this.countries = data;
});
this.currencyService.getEntities().subscribe(data => {
  this.currencies = data;
});
    }

    modalTypes: any[]=[{type: "edit"}];
 

      controlsForBody: any[] = [
        { 
          containerType: "input", 
          formControlName: "name",
          placeHolder: "Введіть скорочену назву",
          labelName: "Коротка назва",
          required: true
        },
        {
          containerType: "input",
          formControlName: "fullName",
          placeHolder: "Введіть повну назву",
          labelName: "Повна назва",
          required: true
        },
        {
          containerType: "input",
          formControlName: "edrpou",
          placeHolder: "",
          labelName: "ЄДРПОУ",
          required: false
        },   
        {
          containerType: "select",
          formControlName: "country",
          placeHolder: "Виберіть Країну",
          bindLabel: "name",
          required: false,
          items: this.countries
        },
        {
          containerType: "select",
          formControlName: "currency",
          placeHolder: "Виберіть Валюту",
          bindLabel: "fullName",
          required: false,
          items: this.currencies
        }
      ];

//Supplier
    delete() {   
      this.closeModal.nativeElement.click();
      this.supplierService.deleteEntity(this.entity.id).subscribe(
        () => {
          this.toast.success('', 'Постачальника видалено');
          this.outputEntity.next(this.entity);        
        },
        () => this.toast.error('Помилка видалення')
      );
    }
    
    create() {
      if (this.generalFormBody.invalid) {
        return;
      }

      this.closeModal.nativeElement.click();
      const form = this.generalFormBody.value;
      const supplier: Supplier = {
        id: 0,
        name: form.name as string,
        fullName: form.fullName as string,
        edrpou: form.edrpou as string,
        currency: form.currency as Currency,
        country: form.country as Country,
      };
      
      this.supplierService.addEntity(supplier).subscribe(
        ()=>{ 
          this.toast.success('', 'Постачальника створено');
          this.outputEntity.next(supplier);
        },
        ()=>this.toast.error('Помилка створення')
      );
    }


    get Countries(): string[] {
      return this.countries.map(e => e.name);
    }
    get Currencies(): string[] {
      return this.currencies.map(e => e.fullName);
    }
  
    updateData() {
      this.selectedEntity = new Supplier(this.entity);
      this.generalFormBody.patchValue(this.selectedEntity);

      if (this.generalFormBody.invalid) {
        return;
      }
      const form = this.generalFormBody.value;
      const supplier: Supplier = {
        id: this.selectedEntity.id,
        name: form.name as string,
        fullName: form.fullName as string,
        edrpou: form.edrpou as string,
        currency: form.currency as Currency,
        country: form.country as Country
      };
  
      this.supplierService.updateEntity(supplier).subscribe(
        () => {
          this.toast.success('', 'Постачальника оновлено');
          this.outputEntity.next(supplier);
        },
        () => this.toast.error('Помилка редагування')
      );

  
      this.closeModal.nativeElement.click();
    }


    resetForm() {
      this.generalFormBody.patchValue(this.selectedEntity);
    }
    }
  
