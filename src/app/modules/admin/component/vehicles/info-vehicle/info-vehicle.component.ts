import { Component, OnInit, ViewChild} from '@angular/core';
import { IssuelogService } from 'src/app/modules/shared/services/issuelog.service';
import { MatFspTableComponent } from 'src/app/modules/shared/components/tables/mat-fsp-table/mat-fsp-table.component';
import { EntitiesDataSourceForVehicle } from 'src/app/modules/shared/data-sources/entities-data-source-for-vehicle';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-vehicle-info',
  templateUrl: './info-vehicle.component.html',
  styleUrls: ['./info-vehicle.component.scss']
})
export class InfoVehicleComponent implements OnInit {
  selectedVehicleId: number;
  value:any;
  sub: any;
  columnDefinitions: string[] = [
    'description',
    'expenses',
    'issueName',
    'workTypeName',
    'newStateName',
    'oldStateName',
    'supplierName',
  ];
  columnNames: string[] = [
    'Опис',
    'Витрати',
    'Поломка',
    'Тип роботи',
    'Стан',
    'Cтарий стан',
    'Постачальник',
  ];

  @ViewChild('table') table: MatFspTableComponent;

  dataSource: EntitiesDataSourceForVehicle;

  constructor(private issueLogService: IssuelogService,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.selectedVehicleId = params['id'];
      });
    this.dataSource = new EntitiesDataSourceForVehicle(this.issueLogService, this.selectedVehicleId);
  }
}
