import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VehicleType } from '../../models/vehicleType';
import { VehicleTypeService } from 'src/app/modules/admin/services/vehicle-type.service';
import { State } from '../../models/state';
import { StateService } from 'src/app/modules/admin/services/state.service';
import { Priority } from 'src/app/modules/core/models/priority';

@Component({
  selector: 'app-filters-tabs',
  templateUrl: './filters-tabs.component.html',
  styleUrls: ['./filters-tabs.component.scss']
})
export class FiltersTabsComponent implements OnInit {
  vehicleTypeList: VehicleType[] = [];
  stateList: State[] = [];
  priorityList = Priority;
  keys = [];

  @Output() StartDateValue = new EventEmitter<string>();
  @Output() EndDateValue = new EventEmitter<string>();
  @Output() VechicleTypeValue = new EventEmitter<string>();
  @Output() StateValue = new EventEmitter<string>();
  @Output() Filter = new EventEmitter();
  @Output() PriorityValue = new EventEmitter<string>();

  selectedType: string;
  selectedState: string;
  selectedPriority: string;

  constructor(private vehicleTypeService: VehicleTypeService, private stateService: StateService) {
    this.keys = Object.keys(this.priorityList).filter(f => !isNaN(Number(f)));
  }

  ngOnInit() {
    this.vehicleTypeService.getEntities().subscribe(data => (this.vehicleTypeList = data));
    this.stateService.getEntities().subscribe(data => (this.stateList = data));
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
    this.Filter.next();
  }
}
