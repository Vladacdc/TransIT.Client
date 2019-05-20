import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VehicleType } from '../../models/vehicleType';
import { VehicleTypeService } from 'src/app/modules/admin/services/vehicle-type.service';
import { State } from '../../models/state';
import { StateService } from 'src/app/modules/admin/services/state.service';
import { MalfuncGroup } from 'src/app/modules/admin/models/malfuncGroup/malfunc-group';
import { MalfuncGroupService } from 'src/app/modules/admin/services/malfunc-group.service';
import { MalfunSubgroup } from 'src/app/modules/admin/models/malfun-subgroup/malfun-subgroup';
import { MalfunSubgroupService } from 'src/app/modules/admin/services/malfun-subgroup.service';
import { Malfunction } from 'src/app/modules/admin/models/malfunc/malfunc';
import { MalfuncService } from 'src/app/modules/admin/services/malfunc.service';
import { Priority } from 'src/app/modules/core/models/priority';
import { group } from '@angular/animations';

@Component({
  selector: 'app-filters-tabs',
  templateUrl: './filters-tabs.component.html',
  styleUrls: ['./filters-tabs.component.scss']
})
export class FiltersTabsComponent implements OnInit {
  vehicleTypeList: VehicleType[] = [];
  stateList: State[] = [];
  malfunctionGroupList: MalfuncGroup[] = [];
  malfunctionSubGroupList: MalfunSubgroup[] = [];
  malfunctionList: Malfunction[] = [];
  priorityList = Priority;
  keys = [];
  malfunctionSubGroupFilteredList: MalfunSubgroup[] = [];
  malfunctionFilteredList: Malfunction[] = [];
  currentMalfunctionSubgroup: MalfunSubgroup;
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

  selectedType: string;
  selectedState: string;
  selectedPriority: string;
  selectedMalfunctionGroup: string;
  selectedMalfunctionSubGroup: string;
  selectedMalfunction: string;

  constructor(
    private vehicleTypeService: VehicleTypeService,
    private stateService: StateService,
    private malfunctionGropService: MalfuncGroupService,
    private malfunctionSubGropService: MalfunSubgroupService,
    private malfunctionService: MalfuncService
  ) {
    this.keys = Object.keys(this.priorityList).filter(f => !isNaN(Number(f)));
  }

  ngOnInit() {
    this.vehicleTypeService.getEntities().subscribe(data => (this.vehicleTypeList = data));
    this.stateService.getEntities().subscribe(data => (this.stateList = data));
    this.malfunctionGropService.getEntities().subscribe(items => (this.malfunctionGroupList = items));
    this.malfunctionSubGropService.getEntities().subscribe(data => {
      this.malfunctionSubGroupList = data;
      this.malfunctionSubGroupFilteredList = data;
    });
    this.malfunctionService.getEntities().subscribe(data => {
      this.malfunctionList = data;
      this.malfunctionFilteredList = data;
    });
    (<any>$('#startDate')).datepicker({
      uiLibrary: 'bootstrap4',
      iconsLibrary: 'fontawesome',
      maxDate: function() {
        return $('#endDate').val();
      }
    });
    (<any>$('#endDate')).datepicker({
      uiLibrary: 'bootstrap4',
      iconsLibrary: 'fontawesome',
      minDate: function() {
        return $('#startDate').val();
      }
    });
  }

  selectGroup(): void {
    this.selectedMalfunctionSubGroup = null;
    this.selectedMalfunction = null;
    if (this.selectedMalfunctionGroup) {
      this.malfunctionSubGroupFilteredList = this.getByGroup(this.selectedMalfunctionGroup);
    }
  }
  private getByGroup(group: string): Array<MalfunSubgroup> {
    return this.malfunctionSubGroupList.filter(subgroup => subgroup.malfunctionGroup.name === group);
  }

  selectMalfunctionGroupType(group) {
    this.selectedMalfunctionSubGroup = null;
    this.currentMalfunctionSubgroup = null;
    this.malfunctionSubGroupFilteredList = this.malfunctionSubGroupList;
    if (group) {
      this.selectedMalfunctionGroup = group.name;
      this.selectGroup();
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

  selectMalfunctionSubGroupType(subgroup) {
    this.selectedMalfunction = null;
    this.currentMalfunction = null;
    this.malfunctionFilteredList = this.malfunctionList;
    if (subgroup) {
      this.selectedMalfunctionSubGroup = subgroup.name;
      this.selectSubgroup();
    }
  }
  selectMalfunctionType(malfunction) {
    if (malfunction) {
      this.selectedMalfunction = malfunction.name;
    }
  }

  selectVechicleType(type) {
    this.selectedType = type;
  }
  selectState(state) {
    this.selectedState = state;
  }
  selectPriority(value) {
    this.selectedPriority = value;
  }
  selectFilter() {
    this.EndDateValue.next(
      $('#endDate')
        .val()
        .toString()
    );
    this.StartDateValue.next(
      $('#startDate')
        .val()
        .toString()
    );
    this.VechicleTypeValue.next(this.selectedType);
    this.StateValue.next(this.selectedState);
    this.PriorityValue.next(this.selectedPriority);
    this.MalfunctionGroupValue.next(this.selectedMalfunctionGroup);
    this.MalfunctionSubGroupValue.next(this.selectedMalfunctionSubGroup);
    this.MalfunctionValue.next(this.selectedMalfunction);
    this.Filter.next();
  }
}
