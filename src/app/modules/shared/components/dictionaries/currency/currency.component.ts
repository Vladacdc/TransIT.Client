import { Component, OnInit, ViewChild } from '@angular/core';
import { Currency } from '../../../models/currency';
import { CurrencyService } from '../../../services/currency.service';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';
import { MatFspTableComponent } from '../../tables/mat-fsp-table/mat-fsp-table.component';
import { EntitiesDataSource } from '../../../data-sources/entities-data-sourse';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  currency: Currency;

  columnDefinitions: string[] = [
    'shortName',
    'fullName'
  ];
  columnNames: string[] = [
    'Абреавіатура',
    'Повна назва'
  ];

  @ViewChild('table') table: MatFspTableComponent;
  @ViewChild('actionsTemplate') actionsTemplate: any;
  @ViewChild('generalTemplate') generalTemplate: any;

  dataSource: EntitiesDataSource<Currency>;

  messageForCreate: 'Додати валюту';

  constructor(
    private currencyService: CurrencyService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Currency>(this.currencyService);
    if (this.authenticationService.getRole() === 'ADMIN') {
      this.table.actionContentTemplate = this.actionsTemplate;
      this.table.generalContentTemplate = this.generalTemplate;
    }
  }

  currencyForm = this.formBuilder.group({
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

  controls: any[] = [
    {
      containerType: 'input',
      formControlName: 'shortName',
      placeHolder: 'Введіть скорочену назву',
      labelName: 'Коротка назва валюти',
      required: true
    },
    {
      containerType: 'input',
      formControlName: 'fullName',
      placeHolder: 'Введіть повну назву',
      labelName: 'Повна назва валюти',
      required: true
    }
  ];

  refreshTable() {
    this.table.loadEntitiesPage();
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

    this.currencyService.addEntity(country).subscribe(
      newCurrency => {
        this.refreshTable();
        this.toast.success('', 'Валюту створено');
      },
      error => this.toast.error('Помилка', 'Валюта вже створена')
    );
  }
}
