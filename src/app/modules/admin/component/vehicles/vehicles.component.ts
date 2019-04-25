import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Vehicle } from '../../models/vehicle/vehicle';
import { VehicleType } from '../../models/vehicleType/vehicle-type';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleTypeService } from '../../services/vehicle-type.service';

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

  constructor(private vehicleService: VehicleService, private chRef: ChangeDetectorRef) { }

  private readonly tableConfig: DataTables.Settings = {
    responsive: true,
    columns: [
      { title: 'Тип транспорту' },
      { title: 'Vin-код' },
      { title: 'Інвентарний номер' },
      { title: 'Реєстраційний номер' },
      { title: 'Бренд' },
      { title: 'Модель' },
      { title: 'Дії', orderable: false }
    ],
    paging: true,
    scrollX: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    }
  };

  ngOnInit() {
    this.table = $('#vehicles').DataTable(this.tableConfig);
    this.vehicleService.getEntities().subscribe(vehicles => {
      this.addTableData(vehicles);
    });
  }

  addTableData(newVehicles: Vehicle[]) {
    this.vehicles = [...newVehicles];
    const view = newVehicles.map(vehicle => this.vehicleToRow(vehicle));
    console.log(view);
    this.table.clear();
    this.table.rows.add(view).draw();

    $('#vehicles tbody')
      .off('click')
      .on('click', 'button[id^="vehicle"]', event => {
        const idTokens = event.currentTarget.id.split('-');
        const id = parseInt(idTokens[idTokens.length - 1], 10);
        console.log(id);
        this.selectedVehicle = this.vehicles.find(i => i.id === id);
      });

  }

  addVehicle(vehicle: Vehicle) {
    this.vehicles.push(vehicle);
    this.table.row.add(this.vehicleToRow(vehicle)).draw();
  }

  vehicleToRow(vehicle: Vehicle): string[] {
    return [
      vehicle.vehicleType.name,
      vehicle.vincode,
      vehicle.inventoryId,
      vehicle.regNum,
      vehicle.brand,
      vehicle.model,
      `<button id="vehicle-${vehicle.id}" class="btn" data-toggle="modal" data-target="#editVehicle"><i class="fas fa-edit"></i></button>
     <button id="vehicle-${vehicle.id}" class="btn" data-toggle="modal" data-target="#deleteVehicle"><i class="fas fas fa-trash-alt"></i></button>`
    ];
  }

  deleteVehicle(vehicle: Vehicle) {
    console.log(this.selectedVehicle);
    this.vehicles = this.vehicles.filter(v => v.id !== vehicle.id);
    this.table.rows($(`button[id^="vehicle-${vehicle.id}"]`).parents('tr'))
      .remove()
      .draw(false);
  }


  updateVehicle(vehicle: Vehicle) {
    this.vehicles[this.vehicles.findIndex(i => i.id === vehicle.id)] = vehicle;

    //  this.table.row($(`button[id^="vehicle-${vehicle.id}"]`).parents('tr'))
    //   .invalidate()
    //   .draw();
    this.vehicleService.getEntities().subscribe(vehicles => {
      this.addTableData(vehicles);
    });
  }

}
