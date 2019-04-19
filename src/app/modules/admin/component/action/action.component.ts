import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActionType } from '../../models/action/actiontype';
import { ActionTypeService } from '../../services/actiontype.sevice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  actionTypeList: ActionType[] = [];
  private actionTypeForm: FormGroup;
  action: ActionType = {
    id: 0,
    name: ''
  };
  constructor(private actionTypeService: ActionTypeService, private chRef: ChangeDetectorRef) {}
  onSubmit() {
    if (this.actionTypeForm.invalid) {
      return;
    }
    const form = this.actionTypeForm.value;
    const action: ActionType = {
      id: 0,
      name: form.name as string
    };
    this.action = action;
  }
  clickSubmit() {
    this.actionTypeService.addEntity(this.action).subscribe();
  }
  ngOnInit() {
    this.actionTypeService.getEntities().subscribe(action => (this.actionTypeList = action));
    $('#action').DataTable({
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });
  }

  createItem() {}

  deleteItem(id: number) {}
}
