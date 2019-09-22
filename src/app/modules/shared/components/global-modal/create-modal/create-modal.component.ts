import { Component, ViewChild, ElementRef, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit {

  @ViewChild('close') closeDiv: ElementRef;

  @Input() controls: any[];
  @Input() generalForm: FormGroup;

  @Output() createEntity = new EventEmitter<FormGroup>();

  @Input() message: string;

  constructor() { }

  ngOnInit() {
    $('#createModal').on('hidden.bs.modal', function () {
      $(this)
        .find('form')
        .trigger('reset');
    });
}

save() {
  this.createEntity.emit(this.generalForm);
  }
}

