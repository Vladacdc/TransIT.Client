import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Currency } from 'src/app/modules/shared/models/currency';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CurrencyService } from 'src/app/modules/shared/services/currency.service';
import { ToastrService } from 'ngx-toastr';
import { NAME_FIELD_ERRORS } from 'src/app/custom-errors';

@Component({
  selector: 'app-create-currency',
  templateUrl: './create-currency.component.html',
  styleUrls: ['./create-currency.component.scss']
})
export class CreateCurrencyComponent implements OnInit {
  @ViewChild('close') closeCreateModal: ElementRef;
  @Output() createCurrency = new EventEmitter<Currency>();
  currencyForm: FormGroup;
  CustomNameErrorMessages = NAME_FIELD_ERRORS;
  constructor(private service: CurrencyService, private formBuilder: FormBuilder, private toast: ToastrService) {}

  ngOnInit() {
    $('#createCurrency').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .trigger('reset');
    });
    this.currencyForm = this.formBuilder.group({
      shortName: new FormControl(
        '',
        Validators.compose([
          Validators.maxLength(5),
          Validators.required,
          Validators.pattern("^[A-Za-zА-Яа-яїієЇІЯЄ/'/`-]+$")
        ])
      ),
      fullName: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.pattern("^[A-Za-zА-Яа-яїієЇІЯЄ /'/`-]+$")])
      )
    });
  }
  clickSubmit() {
    if (this.currencyForm.invalid) {
      return;
    }
    const form = this.currencyForm.value;
    const country: Currency = new Currency({
      shortName: form.shortName,
      fullName: form.fullName
    });

    this.service.addEntity(country).subscribe(
      newCurrency => {
        this.createCurrency.next(newCurrency);
        this.toast.success('', 'Валюту створено');
      },
      error => this.toast.error('Помилка', 'Валюта вже створена')
    );
    this.closeCreateModal.nativeElement.click();
  }
}
