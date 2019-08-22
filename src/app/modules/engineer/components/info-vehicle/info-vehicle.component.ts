import { Component, OnInit, Input } from '@angular/core';
import { MalfunctionGroup } from 'src/app/modules/shared/models/malfunction-group';
import { MalfunctionGroupService } from 'src/app/modules/shared/services/malfunction-group.service';
import { MalfunctionSubgroup } from 'src/app/modules/shared/models/malfunction-subgroup';
import { MalfunctionSubgroupService } from 'src/app/modules/shared/services/malfunction-subgroup.service';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';
import { Malfunction } from 'src/app/modules/shared/models/malfunction';
import { MalfunctionService } from 'src/app/modules/shared/services/malfunction.service';
import { StatisticsService } from 'src/app/modules/shared/services/statistics.service';
import { Vehicle } from 'src/app/modules/shared/models/vehicle';
import { MatTableDataSource } from '@angular/material';
import { IssuelogService } from 'src/app/modules/shared/services/issuelog.service';
import { IssueLog } from 'src/app/modules/shared/models/issuelog';
import { Issue } from 'src/app/modules/shared/models/issue';




@Component({
  selector: 'app-info-vehicle',
  templateUrl: './info-vehicle.component.html',
  styleUrls: ['./info-vehicle.component.scss'],
})
export class InfoVehicleComponent implements OnInit {
  @Input()
  set vehicle(vehicle: Vehicle) {
    if (!vehicle) {
      return;
    }
    this.selectedVehicle = vehicle;
  }
  displayedColumns: string[] = ['position', 'description', 'issue', 'state'];
  dataSource: Array<IssueLog>;

  constructor(
    private malfunctionService: MalfunctionService,
    private malfunctionGroupService: MalfunctionGroupService,
    private malfunctionSubgroupService: MalfunctionSubgroupService,
    private vechicleTypeService: VehicleTypeService,
    private statisticsService: StatisticsService,
    protected issueLogService: IssuelogService
  ) {}
  selectedVehicle = new Vehicle({});

  ngOnInit() {
    this.issueLogService.getEntities().subscribe(data => console.log(data)) ;
  }
}

