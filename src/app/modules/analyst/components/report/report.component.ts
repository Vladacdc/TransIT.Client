import { Component } from '@angular/core';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  selectedStartDate: Date;
  selectedEndDate: Date;
  reportVisibility: boolean = false;
  constructor() {
  }

  getDate(value) {
    if(value) {
      return new Date(value);
    }
    else {
      return null;
    }
  }

}
