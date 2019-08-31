import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from 'src/app/modules/shared/services/supplier.service';
import { Supplier } from 'src/app/modules/shared/models/supplier';
import { EntitiesDataSource } from '../../data-sources/entities-data-sourse';
import { MatFspTableComponent } from '../tables/mat-fsp-table/mat-fsp-table.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
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

  dataSource: EntitiesDataSource<Supplier>;

  constructor(private supplierService: SupplierService) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Supplier>(this.supplierService);
  }

  addSupplier(supplier: Supplier) {
    this.table.loadEntitiesPage();
  }

  deleteSupplier(supplier: Supplier) {
    this.table.loadEntitiesPage();
  }

  updateSupplier(supplier: Supplier) {
    this.table.loadEntitiesPage();
  }
}
