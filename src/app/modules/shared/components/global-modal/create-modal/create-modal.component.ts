import { Component, ViewChild, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit {

  @Input() controls: any[];

  @Input() generalForm: FormGroup;

  myGroup: FormGroup;

  message: 'Створити заявку';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
this.myGroup = this.fb.group(this.generalForm);
  }
}
