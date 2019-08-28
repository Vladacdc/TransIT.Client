import { Component, OnInit} from '@angular/core';
import { EntitiesDataSource } from '../../../shared/data-sources/entities-data-sourse';
import { Vehicle } from 'src/app/modules/shared/models/vehicle';
import { VehicleService } from 'src/app/modules/shared/services/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  vehicle: Vehicle;

  columnDefinitions: string[] = [
    'vehicleTypeName',
    'vincode',
    'inventoryId',
    'regNum',
    'brand',
    'model',
    'locationName',
    'commissioningDate',
    'warrantyEndDate'
  ];
  columnNames: string[] = [
    'Тип транспорту',
    'Вінкод',
    'Інвентарний номер',
    'Реєстраційний номер',
    'Бренд',
    'Модель',
    'Місцезнаходження',
    'Дата введення в експлуатацію',
    'Закінчення гарантійного терміну'
  ];

  dataSource: EntitiesDataSource<Vehicle>;

  constructor(private vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Vehicle>(this.vehicleService);
  }

  addSupplier(supplier: Vehicle) {
  }

  deleteSupplier(supplier: Vehicle) {
  }

  updateSupplier(supplier: Vehicle) {
  }

  isVisibleCheck() {
  }
}
