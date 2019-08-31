import { Component } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';


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
    //this.reportVisibility;
    //this.selectedEndDate=new Date();
    //this.selectedStartDate=new Date("01.01.0001");
  }
}
