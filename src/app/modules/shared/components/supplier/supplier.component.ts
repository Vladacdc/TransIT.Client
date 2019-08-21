import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SupplierService } from 'src/app/modules/shared/services/supplier.service';
import { Supplier } from 'src/app/modules/shared/models/supplier';
import { Observable, fromEvent, merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { EntitiesDataSource } from '../../data-sources/entities-data-sourse';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements AfterViewInit, OnInit {
 
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
  numberOfRows: number = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private supplierService: SupplierService) {
  }


  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Supplier>(this.supplierService);

    this.dataSource.loadEntities('','none',0,1);
  }


  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement,'keyup').pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.loadSuppliersPage();
      })
    ).subscribe();

    merge(this.sort.sortChange, this.paginator.page).pipe(
      tap(() => this.loadSuppliersPage())
    ).subscribe();
    /*this.paginator.page
        .pipe(
            tap(() => this.loadSuppliersPage())
        )
        .subscribe();*/
  }

  loadSuppliersPage() {
    this.dataSource.loadEntities(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
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
