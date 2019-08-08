import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VehicleType } from 'src/app/modules/shared/models/vehicleType';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';
import { DatatableSettings } from 'src/app/modules/shared/helpers/datatable-settings';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.scss']
})
export class VehicleTypeComponent implements OnInit {
  vehicleTypes: VehicleType[] = [];
  table: DataTables.Api;
  selectedVehicleType: VehicleType;

  constructor(private vehicleTypeService: VehicleTypeService, private chRef: ChangeDetectorRef) {}

  private readonly tableConfig = new DatatableSettings({
    columns: [{ title: 'Тип транспорту', data: 'name', defaultContent: '' }, { title: 'Дії', orderable: false }],
    ajax: this.ajaxCallback.bind(this),
    columnDefs: [
      {
        targets: -1,
        data: null,
        defaultContent: `<button class="edit btn" data-toggle="modal" data-target="#editVehicleType"><i class="fas fa-edit"></i></button>
           <button class="delete btn" data-toggle="modal" data-target="#deleteVehicleType"><i class="fas fas fa-trash-alt"></i></button>`
      }
    ],
    language: {
      url: 'assets/language.json'
    }
  });

  ngOnInit() {
    this.table = $('#vehicleTypes').DataTable(this.tableConfig);
    $('#vehicleTypes tbody').on('click', '.edit', this.selectEditItem(this));
    $('#vehicleTypes tbody').on('click', '.delete', this.selectDeleteItem(this));
  }

  private ajaxCallback(dataTablesParameters: any, callback): void {
    this.vehicleTypeService.getFilteredEntities(dataTablesParameters).subscribe(x => {
      callback(x);
    });
  }

  selectEditItem(component: any) {
    return function() {
      const data = component.table.row($(this).parents('tr')).data();
      component.selectedVehicleType = data;
    };
  }

  selectDeleteItem(component: any) {
    return function() {
      const data = component.table.row($(this).parents('tr')).data();
      component.selectedVehicleType = data;
    };
  }

  addVehicleType(vehicleType: VehicleType) {
    this.vehicleTypes.push(vehicleType);
    this.table.draw();
  }

  deleteVehicleType(vehicleType: VehicleType) {
    this.vehicleTypes = this.vehicleTypes.filter(v => v.id !== vehicleType.id);
    this.table.draw();
  }

  updateVehicleType(vehicleType: VehicleType) {
    this.vehicleTypes[this.vehicleTypes.findIndex(i => i.id === vehicleType.id)] = vehicleType;
    this.table.draw();
  }
}
