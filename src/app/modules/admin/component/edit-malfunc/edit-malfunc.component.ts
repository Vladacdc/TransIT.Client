import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-malfunc',
  templateUrl: './edit-malfunc.component.html',
  styleUrls: ['./edit-malfunc.component.scss']
})
export class EditMalfuncComponent implements OnInit {

  public malfunctionGroupForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
