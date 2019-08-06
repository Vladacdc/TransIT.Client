import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VehicleType } from '../../models/vehicleType';
import { State } from '../../models/state';
import { MalfunctionGroup } from '../../models/malfunction-group';
import { MalfunctionSubgroup } from '../../models/malfunction-subgroup';
import { Malfunction } from '../../models/malfunction';
import { Priority, convertPriorityToInt } from 'src/app/modules/core/models/priority/priority';
import { StateService } from '../../services/state.service';
import { MalfunctionService } from '../../services/malfunction.service';
import { MalfunctionGroupService } from '../../services/malfunction-group.service';
import { MalfunctionSubgroupService } from '../../services/malfunction-subgroup.service';
import { VehicleTypeService } from '../../services/vehicle-type.service';
import { Location } from '../../models/location';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-filters-tabs',
  templateUrl: './filters-tabs.component.html',
  styleUrls: ['./filters-tabs.component.scss']
})
export class FiltersTabsComponent implements OnInit {
  vehicleTypeList: VehicleType[] = [];
  stateList: State[] = [];
  malfunctionGroupList: MalfunctionGroup[] = [];
  malfunctionSubGroupList: MalfunctionSubgroup[] = [];
  malfunctionList: Malfunction[] = [];
  locationList: Location[] = [];
  priorityList = [Priority.low, Priority.medium, Priority.high];
  malfunctionSubGroupFilteredList: MalfunctionSubgroup[] = [];
  malfunctionFilteredList: Malfunction[] = [];
  currentMalfunctionSubgroup: MalfunctionSubgroup;
  currentMalfunction: Malfunction;

  @Output() StartDateValue = new EventEmitter<string>();
  @Output() EndDateValue = new EventEmitter<string>();
  @Output() VechicleTypeValue = new EventEmitter<string>();
  @Output() StateValue = new EventEmitter<string>();
  @Output() Filter = new EventEmitter();
  @Output() PriorityValue = new EventEmitter<string>();
  @Output() MalfunctionGroupValue = new EventEmitter<string>();
  @Output() MalfunctionSubGroupValue = new EventEmitter<string>();
  @Output() MalfunctionValue = new EventEmitter<string>();
  @Output() LocationValue = new EventEmitter<string>();

  selectedType: string;
  selectedState: string;
  selectedPriority: string;
  selectedMalfunctionGroup: string;
  selectedMalfunctionSubGroup: string;
  selectedMalfunction: string;
  selectedLocation: string;

  constructor(
    private vehicleTypeService: VehicleTypeService,
    private stateService: StateService,
    private malfunctionGropService: MalfunctionGroupService,
    private malfunctionSubGropService: MalfunctionSubgroupService,
    private malfunctionService: MalfunctionService,
    private locationService: LocationService
  ) {
  }

  ngOnInit() {
    this.vehicleTypeService.getEntities().subscribe(data => (this.vehicleTypeList = data));
    this.stateService.getEntities().subscribe(data => (this.stateList = data));
    this.malfunctionGropService.getEntities().subscribe(items => (this.malfunctionGroupList = items));
    this.malfunctionSubGropService.getEntities().subscribe(data => {
      this.malfunctionSubGroupList = data;
      this.malfunctionSubGroupFilteredList = data;
    });
    this.locationService.getEntities().subscribe(data => (this.locationList = data));
    this.malfunctionService.getEntities().subscribe(data => {
      this.malfunctionList = data;
      this.malfunctionFilteredList = data;
    });
    ($('#startDate') as any).datepicker({
      uiLibrary: 'bootstrap4',
      iconsLibrary: 'fontawesome',
      maxDate() {
        return $('#endDate').val();
      }
    });
    ($('#endDate') as any).datepicker({
      uiLibrary: 'bootstrap4',
      iconsLibrary: 'fontawesome',
      minDate() {
        return $('#startDate').val();
      },
      maxDate: new Date()
    });
  }

  selectGroup(): void {
    this.selectedMalfunctionSubGroup = null;
    this.selectedMalfunction = null;
    if (this.selectedMalfunctionGroup) {
      this.malfunctionSubGroupFilteredList = this.getByGroup(this.selectedMalfunctionGroup);
    }
  }
  private getByGroup(group: string): Array<MalfunctionSubgroup> {
    return this.malfunctionSubGroupList.filter(subgroup => subgroup.malfunctionGroup.name === group);
  }

  selectMalfunctionGroupType(group: MalfunctionGroup) {
    this.selectedMalfunctionSubGroup = null;
    this.currentMalfunctionSubgroup = null;
    this.malfunctionSubGroupFilteredList = this.malfunctionSubGroupList;
    if (group) {
      this.selectedMalfunctionGroup = group.name;
      this.selectGroup();
    }
    else
    {
      this.selectedMalfunctionGroup = "";
    }
  }
  selectSubgroup(): void {
    this.selectedMalfunction = null;
    if (this.selectedMalfunctionSubGroup) {
      this.malfunctionFilteredList = this.getBySubgroup(this.selectedMalfunctionSubGroup);
    }
  }
  private getBySubgroup(subgroup: string): Array<Malfunction> {
    return this.malfunctionList.filter(malfunc => malfunc.malfunctionSubgroup.name === subgroup);
  }
  selectMalfunctionSubGroupType(subgroup: MalfunctionSubgroup) {
    this.selectedMalfunction = null;
    this.currentMalfunction = null;
    this.malfunctionFilteredList = this.malfunctionList;
    if (subgroup) {
      this.selectedMalfunctionSubGroup = subgroup.name;
      this.selectSubgroup();
    }
    else
    {
      this.selectedMalfunctionSubGroup = "";
    }
  }
  selectMalfunctionType(value: Malfunction) {
    if(value)
    {  
      this.selectedMalfunction = value.name;
    }
    else
    {
      this.selectedMalfunction = "";
    }
  }
  selectVechicleType(value: VehicleType) {
    if(value)  
    {
      this.selectedType = value.name;
    }
    else
    {
      this.selectedType = "";
    }
  }
  selectState(value: State) {
    if(value)
    {
      this.selectedState = value.name;
    }
    else
    {
      this.selectedState = "";
    }
  }
  selectPriority(value: string) {
    if(value)
    {
      this.selectedPriority = convertPriorityToInt(value).toString();
    }
    else
    {
      this.selectedPriority = "";
    }
  }
  selectLocation(value: Location) {
    if(value)
    {
      this.selectedLocation = value.name;
    }
    else
    {
      this.selectedLocation = "";
    }
  }
  selectMalfunctionGroup(value: MalfunctionGroup) {
    if(value)
    {
      this.selectedMalfunctionGroup = value.name;
    }
    else
    {
      this.selectedMalfunctionGroup = "";
    }
  }
  selectMalfunctionSubGroup(value: MalfunctionSubgroup) {
    if(value)
    {
      this.selectedMalfunctionSubGroup = value.name;
    }
    else
    {
      this.selectedMalfunctionSubGroup = "";
    }
  }
  selectFilter() {
    this.EndDateValue.emit(
      $('#endDate')
        .val()
        .toString()
    );
    this.StartDateValue.emit(
      $('#startDate')
        .val()
        .toString()
    );
    this.VechicleTypeValue.emit(this.selectedType);
    this.LocationValue.emit(this.selectedLocation);
    this.StateValue.emit(this.selectedState);
    this.PriorityValue.emit(this.selectedPriority);
    this.MalfunctionGroupValue.emit(this.selectedMalfunctionGroup);
    this.MalfunctionSubGroupValue.emit(this.selectedMalfunctionSubGroup);
    this.MalfunctionValue.emit(this.selectedMalfunction);
    this.Filter.emit();
  }
}
