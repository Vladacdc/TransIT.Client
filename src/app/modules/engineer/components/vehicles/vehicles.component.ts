import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Vehicle } from 'src/app/modules/shared/models/vehicle';
import { VehicleService } from 'src/app/modules/shared/services/vehicle.service';
import * as moment from 'moment';
import { DatatableSettings } from 'src/app/modules/shared/helpers/datatable-settings';
import { IssueService } from 'src/app/modules/shared/services/issue.service';
import { Router } from '@angular/router';

declare const $;

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  @Input()
  vehicles: Vehicle[] = [];
  table: DataTables.Api;
  selectedVehicle: Vehicle;
  tableConfig = new DatatableSettings({
    columns: [
      { title: 'Тип транспорту', data: 'vehicleType.name', defaultContent: '' },
      { title: 'Vin-код', data: 'vincode', defaultContent: '' },
      { title: 'Інвентарний номер', data: 'inventoryId', defaultContent: '' },
      { title: 'Реєстраційний номер', data: 'regNum', defaultContent: '' },
      { title: 'Бренд', data: 'brand', defaultContent: '' },
      { title: 'Модель', data: 'model', defaultContent: '' },
      { title: 'Місцезнаходження', data: 'location.name', defaultContent: '' },
      {
        title: 'Дата введення в експлуатацію',
        data: 'commissioningDate',
        defaultContent: '',
        render(data) {
          return moment(data).format('DD.MM.YYYY');
        }
      },
      {
        title: 'Дата закінчення гарантії',
        data: 'warrantyEndDate',
        defaultContent: '',
        render(data) {
          return moment(data).format('DD.MM.YYYY');
        }
      },
      { title: 'Дії', orderable: false }
    ],
    processing: true,
    serverSide: true,
    ajax: this.ajaxCallback.bind(this),
    columnDefs: [
      {
        targets: -1,
        data: null,
        defaultContent: `<button class="info btn"><i class="fas fa-info-circle"></i></button>`
      }
    ],
    language: {
      url: 'assets/language.json'
    }
  });

  constructor(
    private vehicleService: VehicleService,
    private issueService: IssueService,
    private router: Router,
    ) {}

  ngOnInit() {
    this.table = $('#vehicles').DataTable(this.tableConfig);
    $('#vehicles tbody').on('click', '.info', this.selectInfoItem(this));
  }

  private ajaxCallback(dataTablesParameters: any, callback): void {
    this.vehicleService.getFilteredEntities(dataTablesParameters).subscribe(x => {
      callback(x);
    });
  }

  selectInfoItem(component: VehiclesComponent) {
    return function() {
      component.router.navigate(['/engineer/info-vehicle']);
    };
  }

  infoVehicle(vehicle: Vehicle) {
    this.vehicles[this.vehicles.findIndex(i => i.id === vehicle.id)] = vehicle;
    this.table.draw();
  }
}
