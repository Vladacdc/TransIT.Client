import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SupplierService } from 'src/app/modules/shared/services/supplier.service';
import { Supplier } from 'src/app/modules/shared/models/supplier';
import { EntitiesDataSource } from '../../data-sources/entities-data-sourse';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
 
  columnDefinitions: string[] = [
    'name',
    'fullName',
    //'country.name',
    //'currency.fullName',
    'edrpou'
  ];
  columnNames: string[] = [
    'Коротка назва',
    'Повна назва',
    //'Країна',
    //'Валюта',
    'ЄДРПОУ'
  ];

  dataSource: EntitiesDataSource<Supplier>;

  constructor(private supplierService: SupplierService) {
  }


  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Supplier>(this.supplierService);
  }

  addSupplier(supplier: Supplier) {
    
  }

  deleteSupplier(supplier: Supplier) {

  }

  updateSupplier(supplier: Supplier) {

  }

  isVisibleCheck() {
    
  }
}
