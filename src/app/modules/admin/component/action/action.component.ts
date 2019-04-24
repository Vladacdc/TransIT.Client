import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActionType } from '../../models/action/actiontype';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActionTypeService } from '../../services/action-type.sevice';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  private actionTypeForm: FormGroup;
  private readonly tableParams: DataTables.Settings = {
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    }
  };

  actionTypeList: ActionType[] = [];
  index: number;
  action: ActionType = {
    id: 0,
    name: ''
  };

  constructor(
    private actionTypeService: ActionTypeService,
    private chRef: ChangeDetectorRef,
    private toast: ToastrService
  ) {}

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
    this.actionTypeService.getEntities().subscribe(actions => {
      this.actionTypeList = actions;
      this.chRef.detectChanges();
      $('table').DataTable(this.tableParams);
    });
  }

  addAtionType(actionType: ActionType) {
    this.actionTypeList = [...this.actionTypeList, actionType];
  }

  deleteActionType(selectedIndex: number) {
    this.actionTypeService
      .deleteEntity(this.actionTypeList[selectedIndex].id)
      .subscribe(
        () => this.actionTypeList.splice(selectedIndex, 1),
        () => this.toast.error('Помилка', 'Дія в експлуатації')
      );
  }

  selectIndex(selectIndex: number) {
    this.index = selectIndex;
  }
}
