import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActionType } from 'src/app/modules/shared/models/action-type';
import { ActionTypeService } from 'src/app/modules/shared/services/action-type.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-action',
  templateUrl: './edit-action.component.html',
  styleUrls: ['./edit-action.component.scss']
})
export class EditActionComponent implements OnInit {
  selectedAction: ActionType;
  @ViewChild('close') closeDiv: ElementRef;
  @Input()
  set action(action: ActionType) {
    if (!action) {
      return;
    }
    this.selectedAction = new ActionType(action);
    if (this.actionForm) {
      this.resetForm();
    }
  }
  
  @Output() editAction = new EventEmitter<ActionType>();

  actionForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private serviceAction: ActionTypeService,private toast: ToastrService) {}

  ngOnInit() {
    this.actionForm = this.formBuilder.group({
      id: [''],
      name: ['']
    });
    this.resetForm();
  }

  updateData() {
    if (this.actionForm.invalid) {
      return;
    }
    this.closeDiv.nativeElement.click();
    const form = this.actionForm.value;

    const action: ActionType = new ActionType({
      id: form.id as number,
      name: form.name as string
    });
    this.serviceAction.updateEntity(action).subscribe(
      _ => {this.editAction.next(action);
      },
      error => this.toast.error('Даний стан неможливо змінити', 'Помилка')
    );
    
    this.resetForm();
  }

  resetForm() { 
    this.actionForm.patchValue(this.selectedAction);
  }
}
