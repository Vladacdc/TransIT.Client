import { Component, OnInit, Input } from '@angular/core';
import { Currency } from '../../../models/currency';
import { CurrencyService } from '../../../services/currency.service';
import { DatatableSettings } from '../../../helpers/datatable-settings';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  dataTable: DataTables.Api;
  currencies: Currency[];
  currency: Currency;
  @Input() isVisible: boolean;

  constructor(private service: CurrencyService) {}

  readonly options = new DatatableSettings({
    language: {
      url: 'assets/language.json'
    },
    columns: [
      {
        title: 'Абреавіатура'
      },
      {
        title: 'Повна назва'
      },
      {
        title: 'Дії',
        orderable: false,
        visible: this.isVisible
      }
    ]
  });
  ngOnInit() {
    $('#currencyTable').DataTable(this.options);
    this.service.getEntities().subscribe(currencies => {
      this.addTableData(currencies);
    });
  }

  addTableData(newCurrencies: Currency[]) {
    this.currencies = [...newCurrencies];
    const view = newCurrencies.map(i => [
      i.shortName,
      i.fullName,
      `<button id="find-currency-${
        i.id
      }" class="btn" data-toggle="modal" data-target="#deleteCurrency"><i class="fas fa-trash-alt"></i>
      </button>`
    ]);

    this.dataTable = $('#currencyTable')
      .dataTable()
      .api()
      .clear()
      .rows.add(view)
      .draw();

    $('#currencyTable tbody').on('click', 'button', event => {
      const idTokens = event.currentTarget.id.split('-');
      const id = parseInt(idTokens[idTokens.length - 1], 10);
      this.currency = this.currencies.find(i => i.id === id);
    });
  }
  addCurrency(currency: Currency) {
    this.currencies.push(currency);
    this.addTableData(this.currencies);
  }
  deleteCurrency(currency: Currency) {
    this.currencies.splice(this.currencies.findIndex(i => i.id === currency.id), 1);
    this.addTableData(this.currencies);
  }
}
