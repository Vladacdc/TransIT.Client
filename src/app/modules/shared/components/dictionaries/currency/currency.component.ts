import { Component, OnInit, ViewChild } from '@angular/core';
import { Currency } from '../../../models/currency';
import { CurrencyService } from '../../../services/currency.service';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';
import { MatFspTableComponent } from '../../tables/mat-fsp-table/mat-fsp-table.component';
import { EntitiesDataSource } from '../../../data-sources/entities-data-sourse';

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

  constructor(
    private currencyService: CurrencyService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Currency>(this.currencyService);
    if (this.authenticationService.getRole() === 'ADMIN') {
      this.table.actionContentTemplate = this.actionsTemplate;
      this.table.generalContentTemplate = this.generalTemplate;
    }
  }

  refreshTable() {
    this.table.loadEntitiesPage();
  }
}
