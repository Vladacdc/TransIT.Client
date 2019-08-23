import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { EntitiesDataSource } from '../../../data-sources/entities-data-sourse';
import { WorkType } from '../../../models/work-type';
import { WorkTypeService } from '../../../services/work-type.service';


@Component({
  selector: 'app-work-type',
  templateUrl: './work-type.component.html',
  styleUrls: ['./work-type.component.scss']
})
export class WorkTypeComponent implements OnInit {
  columnDefinitions: string[] = [
    'name',
    'estimatedTime',
    'estimatedCost'
  ];
  columnNames: string[] = [
    'Вид роботи',
    'Орієнтовний час роботи',
    'Орієнтовна вартість роботи'
  ];

  dataSource: EntitiesDataSource<WorkType>;
  numberOfRows: number = 100;  //needs to replace with getting data from backend

  constructor(private workTypeService: WorkTypeService) {
  }


  ngOnInit() {
    this.dataSource = new EntitiesDataSource<WorkType>(this.workTypeService);
  }

  addWorkType(workType: WorkType) {
  }

  deleteWorkType(workType: WorkType) {
  }

  updateWorkType(workType: WorkType) {
  }

  isVisibleCheck() {
  }
}