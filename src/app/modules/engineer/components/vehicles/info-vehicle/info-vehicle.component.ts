import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { IssuelogService } from 'src/app/modules/shared/services/issuelog.service';
import { Vehicle } from 'src/app/modules/shared/models/vehicle';
import { MatFspTableComponent } from 'src/app/modules/shared/components/tables/mat-fsp-table/mat-fsp-table.component';
import { EntitiesDataSourceForVehicle } from 'src/app/modules/shared/data-sources/entities-data-source-for-vehicle';
import { ActivatedRoute} from '@angular/router';


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
    'issueName',
    'workTypeName',
    'newStateName',
    'oldStateName',
    'supplierName'
  ];
  columnNames: string[] = [
    'Опис',
    'Витрати',
    'Поломка',
    'Тип роботи',
    'Стан',
    'Cтарий стан',
    'Постачальник'
  ];

  @ViewChild('table') table: MatFspTableComponent;

  dataSource: EntitiesDataSourceForVehicle;
  sub: any;
  selectedVehicleId: number;

  constructor(private issueLogService: IssuelogService,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.selectedVehicleId = params['id'];
      });
    let ds = new EntitiesDataSourceForVehicle(this.issueLogService);
    ds.selectedVehicleId = this.selectedVehicleId;
    this.dataSource = ds;
  }
}