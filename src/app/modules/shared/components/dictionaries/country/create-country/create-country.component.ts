import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Country } from 'src/app/modules/shared/models/country';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { CountryService } from 'src/app/modules/shared/services/country.service';
import { ToastrService } from 'ngx-toastr';
import { NAME_FIELD_ERRORS } from 'src/app/custom-errors';

@Component({
  selector: 'app-create-country',
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.scss']
})
export class CreateCountryComponent implements OnInit {
  countryForm: FormGroup;

  @ViewChild('close') closeCreateModal: ElementRef;
  @Output() createCountry = new EventEmitter<Country>();
  CustomNameErrorMessages = NAME_FIELD_ERRORS;
  constructor(private service: CountryService, private formBuilder: FormBuilder, private toast: ToastrService) {}

  ngOnInit() {
    $('#createCountry').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .trigger('reset');
    });

    this.countryForm = this.formBuilder.group({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.maxLength(30),
          Validators.required,
          Validators.pattern("^[A-Za-zА-Яа-яїієЇІЯЄ /'/`-]+$")
        ])
      )
    });
  }
  clickSubmit() {
    if (this.countryForm.invalid) {
      return;
    }
    const form = this.countryForm.value;
    const country: Country = new Country({
      name: form.name
    });

    this.service.addEntity(country).subscribe(
      newCountry => {
        this.createCountry.next(newCountry);
        this.toast.success('', 'Країну створено');
      },
      error => this.toast.error('Помилка', 'Країна вже створена')
    );
    this.closeCreateModal.nativeElement.click();
  }
}
