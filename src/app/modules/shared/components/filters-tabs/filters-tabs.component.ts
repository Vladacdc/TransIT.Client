import { Component, OnInit } from '@angular/core';
import { VehicleType } from '../../models/vehicleType';
import { VehicleTypeService } from 'src/app/modules/admin/services/vehicle-type.service';
import { State } from '../../models/state';
import { StateService } from 'src/app/modules/admin/services/state.service';

@Component({
  selector: 'app-filters-tabs',
  templateUrl: './filters-tabs.component.html',
  styleUrls: ['./filters-tabs.component.scss']
})
export class FiltersTabsComponent implements OnInit {
  vehicleTypeList: VehicleType[] = [];
  stateList: State[] = [];

  constructor(private vehicleTypeService: VehicleTypeService, private stateService: StateService) {}

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
}
