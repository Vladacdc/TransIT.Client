import { Component, OnInit, ViewChild } from '@angular/core';
import { EntitiesDataSource } from '../../../data-sources/entities-data-sourse';
import { MatFspTableComponent } from '../../tables/mat-fsp-table/mat-fsp-table.component';
import { WorkType } from '../../../models/work-type';
import { WorkTypeService } from '../../../services/work-type.service';

@Component({
  selector: 'app-work-type',
  templateUrl: './work-type.component.html',
  styleUrls: ['./work-type.component.scss']
})
export class WorkTypeComponent implements OnInit {
  workType: WorkType;

  columnDefinitions: string[] = [
    'name',
    'estimatedTime',
    'estimatedCost'
  ];
  columnNames: string[] = [
    'Admin.WorkType.Name',
    'Admin.WorkType.EstimatedTime',
    'Admin.WorkType.EstimatedCost'
  ];

  @ViewChild('table') table: MatFspTableComponent;

  dataSource: EntitiesDataSource<WorkType>;

  constructor(private workTypeService: WorkTypeService) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<WorkType>(this.workTypeService);
  }

  refreshTable() {
    this.table.loadEntitiesPage();
  }
}
