import { Component, OnInit } from '@angular/core';
import { toDate } from '@angular/common/src/i18n/format_date';

@Component({
  selector: 'app-filters-tabs',
  templateUrl: './filters-tabs.component.html',
  styleUrls: ['./filters-tabs.component.scss']
})
export class FiltersTabsComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // var today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    $('#startDate').datepicker({
      uiLibrary: 'bootstrap4',
      //  minDate: today,
      maxDate: function() {
        return $('#endDate').val();
      }
    });
    $('#endDate').datepicker({
      uiLibrary: 'bootstrap4',
      minDate: function() {
        return $('#startDate').val();
      }
    });
  }
}
