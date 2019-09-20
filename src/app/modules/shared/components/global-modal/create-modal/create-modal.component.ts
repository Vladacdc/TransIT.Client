import { Component, ViewChild, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { malfunctionSelectedValidator } from 'src/app/custom-errors';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit {

  @Input() controls: any[];

  @Input() set generalForm(form: FormGroup)
  {
    if (form == null) {
      console.log( 'Form empty!' );
    } else {
this.myGroup = form;
    }
  };

  myGroup: FormGroup;

  message: 'Створити заявку';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
}
}
