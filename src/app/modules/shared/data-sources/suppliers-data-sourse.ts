import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Supplier } from '../models/supplier';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SupplierService } from '../services/supplier.service';

@Injectable()
export class SuppliersDataSource implements DataSource<Supplier> {

    private supplierSubject = new BehaviorSubject<Supplier[]>([]);
    //private loadingSubject = new BehaviorSubject<boolean>(false);

    //public loading$ = this.loadingSubject.asObservable();
    

    constructor(private supplierService: SupplierService) {
    }

    connect(collectionViewer: CollectionViewer): Observable<Supplier[]> {
      return this.supplierSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
      this.supplierSubject.complete();
      //this.loadingSubject.complete();
    }
  
    loadSuppliers(filter: string = '', sorting: string = null, pageIndex: number = 0, pageSize: number = 3) {
      this.supplierService.getEntitiesSmart(filter, sorting, pageIndex, pageSize)
      .subscribe(suppliers => {
        this.supplierSubject.next(suppliers);
      });
    }  
}