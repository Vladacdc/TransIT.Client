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
import { PropertyFilter } from '../../models/property-filter';

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
  maxDate = new Date();

  @Output() Filters = new EventEmitter<PropertyFilter[]>();
  @Output() ApplyFilters = new EventEmitter();

  selectedMinDate: Date;
  selectedMaxDate: Date;
  selectedType: string;
  selectedState: string;
  selectedPriority: string;
  selectedMalfunctionGroup: string;
  selectedMalfunctionSubGroup: string;
  selectedMalfunction: string;
  selectedLocation: string;
  malfunctionSubGroupDisabled = true;
  malfunctionDisabled = true;

  selectedPriority1: string;
  selectedGroup: string;
  selectedSubGroup: string;
  selectedMalf: string;

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
    this.currentMalfunction = null;
    this.malfunctionSubGroupFilteredList = this.malfunctionSubGroupList;
    if (group) {
      this.selectedMalfunctionGroup = group.name;
      this.selectGroup();
      this.malfunctionSubGroupDisabled = false;
    } else {
      this.selectedMalfunctionGroup = '';
      this.selectedMalfunction = '';
      this.malfunctionSubGroupDisabled = true;
      this.malfunctionDisabled = true;
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
      this.malfunctionDisabled = false;
    } else {
      this.selectedMalfunctionSubGroup = '';
      this.malfunctionDisabled = true;
    }
  }
  selectMalfunctionType(value: Malfunction) {
    if (value) {
      this.selectedMalfunction = value.name;
    } else {
      this.selectedMalfunction = '';
    }
  }
  selectPriority(value: string) {
    if (value) {
      this.selectedPriority = convertPriorityToInt(value).toString();
    } else {
      this.selectedPriority = '';
    }
  }

  selectFilter() {
    this.Filters.emit(this.getFilters());
    this.ApplyFilters.emit();
  }

  clearFilter() {
    this.selectedMinDate = undefined;
    this.selectedMaxDate = undefined;
    this.selectedType = undefined;
    this.selectedState = undefined;
    this.selectedPriority = undefined;
    this.selectedMalfunctionGroup = undefined;
    this.selectedMalfunctionSubGroup = undefined;
    this.selectedMalfunction = undefined;
    this.selectedLocation = undefined;
    this.selectedPriority1 = undefined;
    this.selectedGroup = undefined;
    this.selectedSubGroup = undefined;
    this.selectedMalf = undefined;
    this.malfunctionDisabled = true;
    this.malfunctionSubGroupDisabled = true;
    this.selectFilter();
  }


  getFilters(): PropertyFilter[] {
    let filters = []
    if (this.selectedState) {
      filters.push({
        entityPropertyPath: 'state.transName',
        value: this.selectedState,
        operator: '=='
      });
    }

    if (this.selectedMalfunctionGroup) {
      filters.push({
        entityPropertyPath: 'malfunction.malfunctionSubgroup.malfunctionGroup.name',
        value: this.selectedMalfunctionGroup,
        operator: '=='
      });
    }

    if (this.selectedMalfunctionSubGroup) {
      filters.push({
        entityPropertyPath: 'malfunction.malfunctionSubgroup.name',
        value: this.selectedMalfunctionSubGroup,
        operator: '=='
      });
    }

    if (this.selectedMalfunction) {
      filters.push({
        entityPropertyPath: 'malfunction.name',
        value: this.selectedMalfunction,
        operator: '=='
      });
    }

    if (this.selectedPriority) {
      filters.push({
        entityPropertyPath: 'priority',
        value: this.selectedPriority,
        operator: '=='
      });
    }

    if (this.selectedMinDate) {
      filters.push({
        entityPropertyPath: 'createdDate',
        value: this.selectedMinDate === null || this.selectedMinDate === undefined ? '' : new Date(this.selectedMinDate).toDateString(),
        operator: '>='
      });
    }

    if (this.selectedMaxDate) {
      filters.push({
        entityPropertyPath: 'createdDate',
        value: this.selectedMaxDate === null || this.selectedMaxDate === undefined ? '' : new Date(this.selectedMaxDate).toDateString(),
        operator: '<='
      });
    }

    if (this.selectedLocation) {
      filters.push({
        entityPropertyPath: 'vehicle.location.name',
        value: this.selectedLocation,
        operator: '=='
      });
    }

    if (this.selectedType) {
      filters.push({
        entityPropertyPath: 'vehicle.vehicleType.name',
        value: this.selectedType,
        operator: '=='
      });
    }

    return filters;
  }
}
