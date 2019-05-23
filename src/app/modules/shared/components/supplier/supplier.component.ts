import { Component, OnInit, Input } from '@angular/core';
import { SupplierService } from 'src/app/modules/shared/services/supplier.service';
import { Supplier } from 'src/app/modules/shared/models/supplier';
import { Router } from '@angular/router';

declare const $;

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  suppliers: Supplier[];
  supplier: Supplier;
  dataTable: any;
  protected country: string;
  protected currency: string;
  @Input() isVisible: boolean;

  constructor(private service: SupplierService, private router: Router) {}
  _url = this.router.url.substring(1, this.router.url.length - 1);

  private readonly tableConfig: DataTables.Settings = {
    responsive: true,
      columns: [
            {
              title: 'Коротка назва', data: 'name', defaultContent:''
            },
            {
              title: 'Повна назва', data: 'fullName', defaultContent:''
            },
            {
              title: 'Країна', data: 'country.name', defaultContent:''
            },
            {
              title: 'Валюта', data: 'currency.fullName', defaultContent:''
            },
            {
              title: 'ЄДРПОУ', data: 'edrpou', defaultContent:''
            },
            {
              title: 'Дії',
              orderable: false,
              visible: this.isVisible,
              data: null,
        defaultContent:`<button class="first btn" data-toggle="modal" data-target="#editSupplier"><i class="fas fa-edit"></i></button>
        <button class="second btn" data-toggle="modal" data-target="#deleteSupplier"><i class="fas fas fa-trash-alt"></i></button>`
     },
            { 
              data: 'id', visible: false 
            }
          ],
    processing: true,
    serverSide: true,
    ajax: this.ajaxCallback.bind(this),
    paging: true,
    scrollX: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    }
  };

  ngOnInit() {

    this.dataTable = $('#supplier-table').DataTable(this.tableConfig);
    this._url = this._url.substring(0, this._url.indexOf('/'));
    this.isVisibleCheck();
    $('#supplier-table tbody').on('click', '.first', this.selectFirstItem(this));
    $('#supplier-table tbody').on('click', '.second', this.selectSecondItem(this));
  
  }

  private ajaxCallback(dataTablesParameters: any, callback): void {
    this.service.getFilteredEntities(dataTablesParameters).subscribe(callback);
  }
  
  selectFirstItem(component: any) {
    return function() {
      const data = component.dataTable.row($(this).parents('tr')).data();
      component.supplier = data;
    };
  }

  selectSecondItem(component: any) {
    return function() {
      const data = component.dataTable.row($(this).parents('tr')).data();
      component.supplier = data;
    };
  }
  

  addItem(supplier: Supplier) {
    this.dataTable.draw();
  }

  deleteSupplier(supplier: Supplier) {
    this.dataTable = $('#supplier-table').DataTable({
      ...this.tableConfig,
      destroy: true
    });    
  }

  updateSupplier(supplier: Supplier) {
    this.dataTable.draw();
  }

  isVisibleCheck() {
    if (this._url === 'admin') this.isVisible = true;
    else this.isVisible = false;
  }
}

