import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Vehicle } from 'src/app/modules/shared/models/vehicle';
import { VehicleService } from 'src/app/modules/shared/services/vehicle.service';
import * as moment from 'moment';

declare const $;

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  table: DataTables.Api;
  selectedVehicle: Vehicle;

  constructor(private vehicleService: VehicleService) { }

  private readonly tableConfig: any =
    {
      responsive: true,
      columns: [
        { title: 'Тип транспорту', data: 'vehicleType.name', defaultContent: '' },
        { title: 'Vin-код', data: 'vincode', defaultContent: '' },
        { title: 'Інвентарний номер', data: 'inventoryId', defaultContent: '' },
        { title: 'Реєстраційний номер', data: 'regNum', defaultContent: '' },
        { title: 'Бренд', data: 'brand', defaultContent: '' },
        { title: 'Модель', data: 'model', defaultContent: '' },
        { title: 'Дата введення в експлуатацію', data: 'commissioningDate', defaultContent: '', render: function (data) { return moment(data).format("DD.MM.YYYY"); } },
        { title: 'Дата закінчення гарантії', data: 'warrantyEndDate', defaultContent: '', render: function (data) { return moment(data).format("DD.MM.YYYY"); } },
        { title: 'Дії', orderable: false }
      ],
      processing: true,
      serverSide: true,
      ajax: this.ajaxCallback.bind(this),
      columnDefs: [
        {
          targets: -1,
          data: null,
          defaultContent: `<button class="edit btn" data-toggle="modal" data-target="#editVehicle"><i class="fas fa-edit"></i></button>
           <button class="delete btn" data-toggle="modal" data-target="#deleteVehicle"><i class="fas fas fa-trash-alt"></i></button>`
        }
      ],
      paging: true,
      scrollX: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    };


  ngOnInit() {
    this.table = $('#vehicles').DataTable(this.tableConfig);
    $('#vehicles tbody').on('click', '.edit', this.selectEditItem(this));
    $('#vehicles tbody').on('click', '.delete', this.selectDeleteItem(this));

  }

  private ajaxCallback(dataTablesParameters: any, callback): void {
    this.vehicleService.getFilteredEntities(dataTablesParameters).subscribe(callback);
  }

  selectEditItem(component: any) {
    return function () {
      const data = component.table.row($(this).parents('tr')).data();
      component.selectedVehicle = data;
    };
  }

  selectDeleteItem(component: any) {
    return function () {
      const data = component.table.row($(this).parents('tr')).data();
      component.selectedVehicle = data;
    };
  }

  addVehicle(vehicle: Vehicle) {
    this.vehicles.push(vehicle);
    this.table.draw();
  }

  deleteVehicle(vehicle: Vehicle) {
    this.vehicles = this.vehicles.filter(v => v.id !== vehicle.id);
    this.table.draw();
  }

  updateVehicle(vehicle: Vehicle) {
    this.vehicles[this.vehicles.findIndex(i => i.id === vehicle.id)] = vehicle;
    this.table.draw();
  }
}
