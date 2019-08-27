import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { PartIn } from 'src/app/modules/shared/models/part-in';

@Component({
  selector: 'app-part-in-actions',
  templateUrl: './part-in-actions.component.html',
  styleUrls: ['./part-in-actions.component.scss']
})
export class PartInActionsComponent implements OnInit, AfterViewInit {

  @Input() partIn: PartIn;

  constructor() { }

  ngOnInit() {
    console.log(this.partIn);
  }

  ngAfterViewInit() {
    debugger;
    console.log(this.partIn);
  }

  removeItem() {
    console.log('hi angular');
  }
}
