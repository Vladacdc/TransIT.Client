import { Component, OnInit, ViewChild } from '@angular/core';
import { Country } from '../../../models/country';
import { CountryService } from '../../../services/country.service';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';
import { MatFspTableComponent } from '../../tables/mat-fsp-table/mat-fsp-table.component';
import { EntitiesDataSource } from '../../../data-sources/entities-data-sourse';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  country: Country;

  columnDefinitions: string[] = [
    'name'
  ];
  columnNames: string[] = [
    'Назва країни'
  ];

  @ViewChild('table') table: MatFspTableComponent;
  @ViewChild('actionsTemplate') actionsTemplate: any;
  @ViewChild('generalTemplate') generalTemplate: any;

  dataSource: EntitiesDataSource<Country>;

   messageForCreate: 'Додати країну';

  constructor(
    private countryService: CountryService,
    private authenticationService: AuthenticationService,
    private toast: ToastrService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Country>(this.countryService);
    if (this.authenticationService.getRole() === 'ADMIN') {
      this.table.actionContentTemplate = this.actionsTemplate;
      this.table.generalContentTemplate = this.generalTemplate;
    }
  }

  countryForm = this.formBuilder.group({
    name: new FormControl(
      '',
      Validators.compose([
        Validators.maxLength(30),
        Validators.required,
        Validators.pattern("^[A-Za-zА-Яа-яїієЇІЯЄ /'/`-]+$")
      ])
    )
  });

  controls: any[] = [
    {
      containerType: 'input',
      formControlName: 'name',
      placeHolder: 'Введіть повну назву країни',
      labelName: 'Назва країни',
      required: true
    }
  ];

  refreshTable() {
    this.table.loadEntitiesPage();
  }


  clickSubmit(formValue: FormGroup) {
    if (formValue.invalid) {
      return;
    }
    const form = formValue.value;
    const country: Country = new Country({
      name: form.name
    });

    this.countryService.addEntity(country).subscribe(
      newCountry => {
        this.refreshTable();
        this.toast.success('', 'Країну створено');
      },
      error => this.toast.error('Помилка', 'Країна вже створена')
    );
  }
}
