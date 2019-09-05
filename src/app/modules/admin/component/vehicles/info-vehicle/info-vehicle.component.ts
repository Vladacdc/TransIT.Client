import { Component, OnInit, ViewChild} from '@angular/core';
import { IssuelogService } from 'src/app/modules/shared/services/issuelog.service';
import { MatFspTableComponent } from 'src/app/modules/shared/components/tables/mat-fsp-table/mat-fsp-table.component';
import { EntitiesDataSourceForVehicle } from 'src/app/modules/shared/data-sources/entities-data-source-for-vehicle';
import { ActivatedRoute} from '@angular/router';


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
    'Shared.Vehicles.InfoVehicle.Description',
    'Shared.Vehicles.InfoVehicle.Expenses',
    'Shared.Vehicles.InfoVehicle.Issue',
    'Shared.Vehicles.InfoVehicle.WorkType',
    'Shared.Vehicles.InfoVehicle.State',
    'Shared.Vehicles.InfoVehicle.OldState',
    'Shared.Vehicles.InfoVehicle.Supplier',
  ];

  @ViewChild('table') table: MatFspTableComponent;

  dataSource: EntitiesDataSourceForVehicle;
  ds = new EntitiesDataSourceForVehicle(this.issueLogService);

  constructor(private issueLogService: IssuelogService,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.selectedVehicleId = params['id'];
      });

    this.ds.selectedVehicleId = this.selectedVehicleId;
    this.dataSource = this.ds;
  }
}
