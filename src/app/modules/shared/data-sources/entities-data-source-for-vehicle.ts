import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { EntitiesDataSource } from './entities-data-sourse';
import { Vehicle } from '../models/vehicle';
import { IssuelogService } from '../services/issuelog.service';
import { IssueLog } from '../models/issuelog';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class EntitiesDataSourceForVehicle extends EntitiesDataSource<IssueLog> {

    private vehicleId: number;

    constructor(private issueLogService: IssuelogService, private selectedVehicleId: number) {
        super(issueLogService);
        this.vehicleId = selectedVehicleId;
    }

    loadEntities(
        filter: string = '',
        sorting: string = null,
        pageIndex: number = 0,
        pageSize: number = 3,
        paginator: MatPaginator = null) {

        this.issueLogService.getFilteredEntities({// this strange format needs on backend
          start: pageSize * pageIndex,
          length: pageSize,
          search: {value: filter},

          order: [{column: 0, dir: 'desc'}],
            /*draw: 1,
            columns: [
              {data: 'name',name:"",orderable: true},
              {data: 'fullName',name:"",orderable: true},
              {data: 'edrpou',name:"",orderable: true},
            ],
            */
        })
        .subscribe(entities => {
          entities.data.forEach(issueLog => {
              if (issueLog.issue.vehicle.id == this.vehicleId) {
                this.entitySubject.next(entities.data);
                if (paginator) {
                  paginator.length = entities.recordsTotal; // recordsFiltered
                }
              }
            }
          );
        });
      }
}
