import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { IssuelogService } from 'src/app/modules/shared/services/issuelog.service';
import { EntitiesDataSource } from 'src/app/modules/shared/data-sources/entities-data-sourse';
import { Vehicle } from 'src/app/modules/shared/models/vehicle';
import { IssueLog } from 'src/app/modules/shared/models/issuelog';
import { MatFspTableComponent } from 'src/app/modules/shared/components/tables/mat-fsp-table/mat-fsp-table.component';
import { EntitiesDataSourceForVehicle } from 'src/app/modules/shared/data-sources/entities-data-source-for-vehicle';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';


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
    'updatedDate',
    'createdDate'
  ];
  columnNames: string[] = [
    'Опис',
    'Витрати',
    'Поломка',
    'Тип роботи',
    'Стан',
    'Cтарий стан',
    'Постачальник',
    'Дата зміни',
    'Дата створення'
  ];

  @ViewChild('table') table: MatFspTableComponent;

  dataSource: EntitiesDataSourceForVehicle;

  constructor(private issueLogService: IssuelogService,private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.selectedVehicleId = params['id'];
      });
      console.log(this.selectedVehicleId);
    this.dataSource = new EntitiesDataSourceForVehicle(this.issueLogService, this.selectedVehicleId);
  }
}
