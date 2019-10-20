import { MatPaginator } from '@angular/material';
import { EntitiesDataSource } from './entities-data-sourse';
import { Injectable } from '@angular/core';
import { Issue } from '../models/issue';
import { IssueService } from '../services/issue.service';

@Injectable()
export class IssueDataSource extends EntitiesDataSource<Issue> {
  
  constructor(private issueService: IssueService) {
    super(issueService);
  }
  
  loadFilteredEntities(
    search: string = '',
    filters: any, // {entityPropertyPath: string; value: string, operator: string}[]
    sorting: any,
    pageIndex: number = 0,
    pageSize: number = 5,
    paginator: MatPaginator = null) {

    this.issueService.getFilteredEntities({
      start: pageSize * pageIndex,
      length: pageSize,
      search: { value: search },
      order: [{ column: 0, dir: sorting.direction }],
      filters: filters,
      columns: [
        { data: sorting.columnDef, name: "", orderable: true }
      ],
    }).subscribe(entities => {
      this.entitySubject.next(entities.data);
      if (paginator) {
        if (search == '') {
          paginator.length = entities.recordsTotal;
        }
        else {
          paginator.length = entities.recordsFiltered;
        }
      }
    });
  }
}
