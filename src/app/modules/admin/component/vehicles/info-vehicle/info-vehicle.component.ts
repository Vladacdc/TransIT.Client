import { Component, OnInit} from '@angular/core';
import { IssuelogService } from 'src/app/modules/shared/services/issuelog.service';
import { EntitiesDataSource } from 'src/app/modules/shared/data-sources/entities-data-sourse';
import { Vehicle } from 'src/app/modules/shared/models/vehicle';
import { IssueLog } from 'src/app/modules/shared/models/issuelog';


@Component({
  selector: 'app-vehicle-info',
  templateUrl: './info-vehicle.component.html',
  styleUrls: ['./info-vehicle.component.scss']
})
export class InfoVehicleComponent implements OnInit {
 
  columnDefinitions: string[] = [
    'description',
    'expenses',
    'actionTypeName',
    'issueName',
    'workTypeName',
    'newStateName',
    'oldStateName',
    'supplierName',
    'updatedDate',
    'createdDate',
    // 'documents'
  ];
  columnNames: string[] = [
    'Опис',
    'expenses',
    'екшн тайп',
    'Поломка',
    'Тип роботи',
    'Стан',
    'Cтарий стан',
    'Постачальник',
    'Дата зміни',
    'Дата створення',
    // 'Документи'
  ];

  dataSource: EntitiesDataSource<IssueLog>;

  constructor(private issueLogService: IssuelogService) {
  }


  ngOnInit() {
    this.dataSource = new EntitiesDataSource<IssueLog>(this.issueLogService);
  }

  isVisibleCheck() {
  }
}