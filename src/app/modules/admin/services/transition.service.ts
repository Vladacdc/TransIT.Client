import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';
import { Transition } from '../models/transition/transition';

@Injectable()
export class TransitionService extends CrudService<Transition> {
  protected readonly serviceUrl = `${environment.apiUrl}/transition`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/transition`;

  protected mapEntity(transition: Transition): Transition {
    return new Transition(transition);
  }
}
