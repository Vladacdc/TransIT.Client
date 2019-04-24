import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Vehicle } from '../../models/vehicle/vehicle';
import { VehicleType } from '../../models/vehicleType/vehicle-type';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleTypeService } from '../../services/vehicle-type.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  vehicleTypeList: VehicleType[] = [];
  datatable: DataTables.Api;
  vehicle: Vehicle;

  private readonly tableParams: DataTables.Settings = {
    columnDefs: [
      {
        targets: [6],
        orderable: false
      }
    ],
    scrollX: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    }
  };

  constructor(
    private serviceVehicle: VehicleService,
    private serviceVehicleType: VehicleTypeService,
    private chRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.serviceVehicleType.getEntities().subscribe(type => (this.vehicleTypeList = type));
    this.serviceVehicle.getEntities().subscribe(vehicles => {
      this.vehicles = vehicles;
      this.chRef.detectChanges();
      const table = $('table');
      this.datatable = table.DataTable(this.tableParams);
    });
  }

  addVehicle(vehicle: Vehicle) {
    this.vehicles = [...this.vehicles, vehicle];
  }

  selectVehicle(vehicleItem: Vehicle) {
    this.vehicle = vehicleItem;
  }

  deleteVehicle(vehicle: Vehicle) {
    this.vehicles = this.vehicles.filter(v => v.id !== vehicle.id);
  }

  updateVehicle(vehicle: Vehicle) {
    const index = this.vehicles.findIndex(v => v.id === vehicle.id);
    this.vehicles[index] = vehicle;
    this.vehicles = [...this.vehicles];
  }
}
