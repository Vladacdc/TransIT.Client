import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VehicleType } from 'src/app/modules/shared/models/vehicleType';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.scss']
})
export class VehicleTypeComponent implements OnInit {
  vehicleTypes: VehicleType[] = [];
  table: DataTables.Api;
  selectedVehicleType: VehicleType;

  constructor(private vehicleTypeService: VehicleTypeService, private chRef: ChangeDetectorRef) { }

  private readonly tableConfig: DataTables.Settings = {
    responsive: true,
    columns: [
      { title: 'Тип транспорту', data: 'name', defaultContent: '' },
      { title: 'Дії', orderable: false }
    ],
    processing: true,
    serverSide: true,
    ajax: this.ajaxCallback.bind(this),
    columnDefs: [
      {
        targets: -1,
        data: null,
        defaultContent: `<button class="edit btn" data-toggle="modal" data-target="#editVehicleType"><i class="fas fa-edit"></i></button>
           <button class="delete btn" data-toggle="modal" data-target="#deleteVehicleType"><i class="fas fas fa-trash-alt"></i></button>`
      }
    ],
    paging: true,
    scrollX: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    }
  };

  ngOnInit() {
    this.table = $('#vehicleTypes').DataTable(this.tableConfig);
    $('#vehicleTypes tbody').on('click', '.edit', this.selectEditItem(this));
    $('#vehicleTypes tbody').on('click', '.delete', this.selectDeleteItem(this));
  }

  private ajaxCallback(dataTablesParameters: any, callback): void {
    this.vehicleTypeService.getFilteredEntities(dataTablesParameters).subscribe(callback);
  }

  selectEditItem(component: any) {
    return function () {
      const data = component.table.row($(this).parents('tr')).data();
      component.selectedVehicleType = data;
    };
  }

  selectDeleteItem(component: any) {
    return function () {
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
