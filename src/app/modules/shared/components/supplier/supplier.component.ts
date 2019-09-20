import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from 'src/app/modules/shared/services/supplier.service';
import { Supplier } from 'src/app/modules/shared/models/supplier';
import { EntitiesDataSource } from '../../data-sources/entities-data-sourse';
import { MatFspTableComponent } from '../tables/mat-fsp-table/mat-fsp-table.component';
import { AuthenticationService } from 'src/app/modules/core/services/authentication.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  supplier: Supplier;

  columnDefinitions: string[] = [
    'name',
    'fullName',
    'countryName',
    'currencyFullName',
    'edrpou'
  ];
  columnNames: string[] = [
    'Коротка назва',
    'Повна назва',
    'Країна',
    'Валюта',
    'ЄДРПОУ'
  ];

  @ViewChild('table') table: MatFspTableComponent;
  @ViewChild('actionsTemplate') actionsTemplate: any;
  @ViewChild('generalTemplate') generalTemplate: any;

  dataSource: EntitiesDataSource<Supplier>;

  constructor(
    private supplierService: SupplierService,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Supplier>(this.supplierService);

    if (this.authenticationService.getRole() === 'ADMIN') {
      this.table.actionContentTemplate = this.actionsTemplate;
      this.table.generalContentTemplate = this.generalTemplate;
    }
  }

  refreshTable() {
    this.table.loadEntitiesPage();
  }
}
