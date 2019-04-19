import { Component, OnInit } from '@angular/core';
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
  vehicle: Vehicle = {
    brand: '',
    inventoryId: '',
    model: '',
    regNum: '',
    vehicleType: undefined,
    vincode: ''
  };
  constructor(private serviceVehicle: VehicleService, private serviceVehicleType: VehicleTypeService) {}

  ngOnInit() {
    $('#vehicles').DataTable({
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });
  }

  createItem() {}

  deleteItem(id: number) {}
}
