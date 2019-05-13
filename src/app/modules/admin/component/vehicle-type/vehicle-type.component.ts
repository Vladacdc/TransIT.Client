import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VehicleType } from 'src/app/modules/engineer/models/vehicleType';
import { VehicleTypeService } from '../../services/vehicle-type.service';

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
      { title: 'Тип транспорту' },
      { title: 'Дії', orderable: false }
    ],
    paging: true,
    scrollX: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    }
  };

  ngOnInit() {
    this.table = $('#vehicleTypes').DataTable(this.tableConfig);
    this.vehicleTypeService.getEntities().subscribe(vehicleTypes => {
      this.addTableData(vehicleTypes);
    });
  }

  addTableData(newVehicles: VehicleType[]) {
    this.vehicleTypes = [...newVehicles];
    const view = newVehicles.map(vehicle => this.vehicleToRow(vehicle));
    console.log(view);
    this.table.clear();
    this.table.rows.add(view).draw();

    $('#vehicleTypes tbody')
      .off('click')
      .on('click', 'button[id^="vehicleType"]', event => {
        const idTokens = event.currentTarget.id.split('-');
        const id = parseInt(idTokens[idTokens.length - 1], 10);
        console.log(id);
        this.selectedVehicleType = this.vehicleTypes.find(i => i.id === id);
      });

  }

  addVehicleType(vehicleType: VehicleType) {
    this.vehicleTypes.push(vehicleType);
    this.table.row.add(this.vehicleToRow(vehicleType)).draw();
  }

  vehicleToRow(vehicleType: VehicleType): string[] {
    return [
      vehicleType.name,
      `<button id="vehicleType-${vehicleType.id}" class="btn" data-toggle="modal" data-target="#editVehicleType"><i class="fas fa-edit"></i></button>
     <button id="vehicleType-${vehicleType.id}" class="btn" data-toggle="modal" data-target="#deleteVehicleType"><i class="fas fas fa-trash-alt"></i></button>`
    ];
  }

  deleteVehicleType(vehicleType: VehicleType) {
    console.log(this.selectedVehicleType);
    this.vehicleTypes = this.vehicleTypes.filter(v => v.id !== vehicleType.id);
    this.table.rows($(`button[id^="vehicleType-${vehicleType.id}"]`).parents('tr'))
      .remove()
      .draw(false);
  }
  updateVehicleType(vehicleType: VehicleType) {
    this.vehicleTypes[this.vehicleTypes.findIndex(i => i.id === vehicleType.id)] = vehicleType;
    this.vehicleTypeService.getEntities().subscribe(vehicleTypes => {
      this.addTableData(vehicleTypes);
    });
  }
}
