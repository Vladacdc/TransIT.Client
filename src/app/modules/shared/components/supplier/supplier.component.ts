import { Component, OnInit, Input } from '@angular/core';
import { SupplierService } from 'src/app/modules/shared/services/supplier.service';
import { Supplier } from 'src/app/modules/shared/models/supplier';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  suppliers: Supplier[];
  supplier: Supplier;
  
  protected country: string;
  protected currency: string;
  @Input() isVisible: boolean;

  constructor(private service: SupplierService, private router: Router) {}
  _url = this.router.url.substring(1, this.router.url.length - 1);

  columnDefinitions: string[] = [
    'name',
    'fullName',
    'country.name',
    'currency.fullName',
    'edrpou'
  ];

  columnNames: string[] = [
    'Коротка назва',
    'Повна назва',
    'Країна',
    'Валюта',
    'ЄДРПОУ'
  ];

  observableData: Observable<Supplier[]>;



  ngOnInit() {
    this._url = this._url.substring(0, this._url.indexOf('/'));
    this.isVisibleCheck();
    if (this._url === 'admin') {
      //add buttons
    }

    this.observableData = this.service.getEntities();
  }

  addSupplier(supplier: Supplier) {
    
  }

  deleteSupplier(supplier: Supplier) {

  }

  updateSupplier(supplier: Supplier) {

  }

  isVisibleCheck() {
    this.isVisible = this._url === 'admin';
  }
}
