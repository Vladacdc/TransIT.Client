import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/modules/shared/services/location.service';
import { Location } from 'src/app/modules/shared/models/location';
import { DatatableSettings } from 'src/app/modules/shared/helpers/datatable-settings';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  locations: Location[] = [];
  table: DataTables.Api;
  selectedLocation: Location;

  constructor(private locationService: LocationService) { }

  readonly options = new DatatableSettings({
    columns: [
      { title: 'Назва', data: 'name', defaultContent: '' },
      { title: 'Опис', data: 'description', defaultContent: '' },
      { title: 'Дії', orderable: false }
    ],
    processing: true,
    serverSide: true,
    responsive: true,
    ajax: this.ajaxCallback.bind(this),
    columnDefs: [
      {
        targets: -1,
        data: null,
        defaultContent: `<button class="edit btn" data-toggle="modal" data-target="#editLocation"><i class="fas fa-edit"></i></button>
           <button class="delete btn" data-toggle="modal" data-target="#deleteLocation"><i class="fas fas fa-trash-alt"></i></button>`
      }
    ],
    paging: true,
    language: { url: 'assets/language.json'}
  });

  ngOnInit() {
    this.table = $('#locations').DataTable(this.options);
    $('#locations tbody').on('click', '.edit', this.selectEditItem(this));
    $('#locations tbody').on('click', '.delete', this.selectDeleteItem(this));
  }

  private ajaxCallback(dataTablesParameters: any, callback): void {
    this.locationService.getFilteredEntities(dataTablesParameters).subscribe(callback);
  }

  selectEditItem(component: any) {
    return function () {
      const data = component.table.row($(this).parents('tr')).data();
      component.selectedLocation = data;
    };
  }

  selectDeleteItem(component: any) {
    return function () {
      const data = component.table.row($(this).parents('tr')).data();
      component.selectedLocation = data;
    };
  }

  addLocation(location: Location) {
    this.locations.push(location);
    this.table.draw();
  }

  deleteLocation(location: Location) {
    this.locations = this.locations.filter(v => v.id !== location.id);
    this.table.draw();
  }

  updateLocation(location: Location) {
    this.locations[this.locations.findIndex(i => i.id === location.id)] = location;
    this.table.draw();
  }
}
