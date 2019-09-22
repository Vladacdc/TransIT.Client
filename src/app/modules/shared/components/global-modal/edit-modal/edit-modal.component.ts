import { Component, ViewChild, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {

  @Input() controls: any[];
  @Input() generalForm: FormGroup;

  @Output() updateEntity = new EventEmitter<FormGroup>();
  @Output() triggerResetForm = new EventEmitter<any>();

  @Input() message: string;

  constructor() { }

  ngOnInit() {
    $('#editModal').on('hidden.bs.modal', function () {
      $(this)
        .find('form')
        .trigger('reset');
    });
  }

save(){
  this.updateEntity.emit(this.generalForm);
  this.triggerResetForm.emit();
}

}
