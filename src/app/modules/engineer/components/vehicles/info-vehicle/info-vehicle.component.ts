import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { IssuelogService } from 'src/app/modules/shared/services/issuelog.service';
import { EntitiesDataSource } from 'src/app/modules/shared/data-sources/entities-data-sourse';
import { Vehicle } from 'src/app/modules/shared/models/vehicle';
import { IssueLog } from 'src/app/modules/shared/models/issuelog';
import { MatFspTableComponent } from 'src/app/modules/shared/components/tables/mat-fsp-table/mat-fsp-table.component';


@Component({
  selector: 'app-vehicle-info',
  templateUrl: './info-vehicle.component.html',
  styleUrls: ['./info-vehicle.component.scss']
})
export class InfoVehicleComponent implements OnInit {
  @Input() vehicle: Vehicle;
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

  @ViewChild('table') table: MatFspTableComponent;

  dataSource: EntitiesDataSource<IssueLog>;

  constructor(private issueLogService: IssuelogService) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<IssueLog>(this.issueLogService);
  }
}