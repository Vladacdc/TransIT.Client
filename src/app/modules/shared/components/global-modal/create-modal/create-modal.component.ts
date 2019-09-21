import { Component, ViewChild, ElementRef, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { malfunctionSelectedValidator } from 'src/app/custom-errors';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit {

  @ViewChild('close') closeDiv: ElementRef;

  @Input() controls: any[];
  @Output() createEntity = new EventEmitter<FormGroup>();
  @Output() reloadEntity = new EventEmitter<any>();
  @Input() message: string;
  @Input() generalForm: FormGroup;


 

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
  this.closeDiv.nativeElement.click();
  }
}

