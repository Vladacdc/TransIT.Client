import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionType } from 'src/app/modules/shared/models/action-type';
import { ActionTypeService } from 'src/app/modules/shared/services/action-type.service';

@Component({
  selector: 'app-create-action',
  templateUrl: './create-action.component.html',
  styleUrls: ['./create-action.component.scss']
})
export class CreateActionComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Output() createAction = new EventEmitter<ActionType>();
  actionForm: FormGroup;

  constructor(private serviceAction: ActionTypeService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    $('#createAction').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .trigger('reset');
    });
    this.actionForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  clickSubmit() {
    if (this.actionForm.invalid) {
      return;
    }
    const form = this.actionForm.value;
    const action: ActionType = {
      id: 0,
      name: form.name as string
    };

    this.serviceAction.addEntity(action).subscribe(newGroup => this.createAction.next(newGroup));
    this.closeDiv.nativeElement.click();
  }
}
