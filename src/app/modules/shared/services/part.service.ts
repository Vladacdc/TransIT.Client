import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { Part } from '../models/part';

@Injectable()
export class PartService extends CrudService<Part> {
  protected readonly serviceUrl = `${environment.apiUrl}/Part`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/Part`;

  protected mapEntity(entity: Part): Part {
    let part = new Part(entity);
    if(part.manufacturer){
        part.manufacturerName = entity.manufacturer.name;
    }
    if(part.unit){
        part.unitName=entity.unit.name;
    }
    return part;
  }
}
