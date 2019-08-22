import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Vehicle } from 'src/app/modules/shared/models/vehicle';
import { VehicleType } from 'src/app/modules/shared/models/vehicleType';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';
import { DatePipe } from '@angular/common';
import { NUM_FIELD_ERRORS, LET_NUM_FIELD_ERRORS } from 'src/app/custom-errors';
import { LocationService } from 'src/app/modules/shared/services/location.service';
import { Location } from 'src/app/modules/shared/models/location';
import { MalfunctionService } from 'src/app/modules/shared/services/malfunction.service';
import { MalfunctionGroupService } from 'src/app/modules/shared/services/malfunction-group.service';
import { MalfunctionSubgroupService } from 'src/app/modules/shared/services/malfunction-subgroup.service';
import { StatisticsService } from 'src/app/modules/shared/services/statistics.service';

const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-info-vehicle',
  templateUrl: './info-vehicle.component.html',
  styleUrls: ['./info-vehicle.component.scss'],
  providers: [DatePipe]
})
export class InfoVehicleComponent implements OnInit {
  @Input()
  set vehicle(vehicle: Vehicle) {
    if (!vehicle) {
      return;
    }
    this.selectedVehicle = vehicle;
  };
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(
    private malfunctionService: MalfunctionService,
    private malfunctionGroupService: MalfunctionGroupService,
    private malfunctionSubgroupService: MalfunctionSubgroupService,
    private vechicleTypeService: VehicleTypeService,
    private statisticsService: StatisticsService
  ) {
  }
  selectedVehicle = new Vehicle({});

  ngOnInit() {
  };
}
