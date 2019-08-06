import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../../../models/country';
import { CountryService } from '../../../services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  countries: Country[];
  country: Country;
  dataTable: any;
  @Input() isVisible: boolean;
  constructor(private service: CountryService) {}

  ngOnInit() {
    $('#countryTable').DataTable({
      drawCallback: function(settings) {
        let pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
        let pagelength = $(this).closest('.dataTables_wrapper').find('.dataTables_length');
        pagination.toggle(this.api().page.info().pages > 1);
        pagelength.toggle(this.api().data().length > 10);
      },
      scrollX: true,
      language: {
        url: 'assets/language.json'
      },
      columns: [
        {
          title: 'Назва країни'
        },
        {
          title: 'Дії',
          orderable: false,
          visible: this.isVisible
        }
      ]
    });
    this.service.getEntities().subscribe(countries => {
      this.addTableData(countries);
    });
  }

  addTableData(newCountries: Country[]) {
    this.countries = [...newCountries];
    const view = newCountries.map(i => [
      i.name,
      `<button id="find-country-${
        i.id
      }" class="btn" data-toggle="modal" data-target="#deleteCountry"><i class="fas fa-trash-alt"></i>
      </button>`
    ]);

    this.dataTable = $('#countryTable')
      .dataTable()
      .api()
      .clear()
      .rows.add(view)
      .draw();

    $('#countryTable tbody').on('click', 'button', event => {
      const idTokens = event.currentTarget.id.split('-');
      const id = parseInt(idTokens[idTokens.length - 1], 10);
      this.country = this.countries.find(i => i.id === id);
    });
  }
  addCountry(country: Country) {
    this.countries.push(country);
    this.addTableData(this.countries);
  }
  deleteCountry(country: Country) {
    this.countries.splice(this.countries.findIndex(i => i.id === country.id), 1);
    this.addTableData(this.countries);
  }
}
