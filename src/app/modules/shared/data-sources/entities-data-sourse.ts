import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { TEntity } from '../../core/models/entity/entity';
import { MatPaginator } from '@angular/material';

@Injectable()
export class EntitiesDataSource<Entity extends TEntity<Entity>> implements DataSource<Entity> {

  protected entitySubject = new BehaviorSubject<Entity[]>([]);

  constructor(private crudService: CrudService<Entity>) {
  }

  connect(collectionViewer: CollectionViewer): Observable<Entity[]> {
    return this.entitySubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.entitySubject.complete();
  }

  loadEntities(
    filter: string = '',
    sorting: string = null,
    pageIndex: number = 0,
    pageSize: number = 5,
    paginator: MatPaginator = null) {
    
    this.crudService.getFilteredEntities({
      start: pageSize*pageIndex,
      length: pageSize,
      search: {value: filter},
      order: [{column:0, dir: "desc"}],
        /*draw: 1,
        
        columns: [
          {data: 'name',name:"",orderable: true},
          {data: 'fullName',name:"",orderable: true},
          {data: 'edrpou',name:"",orderable: true},
        ],
        */
    }).subscribe(entities => {
      this.entitySubject.next(entities.data);
      if(paginator) {
        if(filter=='') {
          paginator.length = entities.recordsTotal;
        }
        else {
          paginator.length = entities.recordsFiltered;
        }
      }
    });
  }  
}
