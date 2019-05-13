import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../../core/services/crud.service';
import { Issue } from '../models/issue/issue';

@Injectable({
  providedIn: 'root'
})
  export class IssueService extends CrudService<Issue> {
  protected readonly serviceUrl = `${environment.apiUrl}/issue`;
}
