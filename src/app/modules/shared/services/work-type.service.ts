import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';
import { WorkType } from '../models/work-type' ;

@Injectable({
    providedIn: 'root'
})
export class WorkTypeService extends CrudService<WorkType> {
    protected readonly serviceUrl= `${environment.apiUrl}/workType`;
    protected readonly datatableUrl = `${environment.apiUrl}/datatable/workType`;

    protected mapEntity(entity: WorkType): WorkType {
        return new WorkType(entity);
      }
}
