import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { ActionType } from '../../models/action/actiontype';
import { ActionTypeService } from '../../services/actiontype.sevice';
import { FormGroup } from '@angular/forms';
//declare const $;
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
  private readonly tableParams: DataTables.Settings = {
    columnDefs: [
      {
        targets: [1,2],
        orderable : false    
      }
    ],
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    }
  };
  constructor(private actionTypeService: ActionTypeService) {}
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
  // ngOnInit() {    
  //   this.actionTypeService.getEntities().subscribe(action => {
  //     this.actionTypeList = action;
  //     $('#action').DataTable(this.tableParams);      
  //   });    
  // }
  ngOnInit() {    
    $('#action').DataTable(this.tableParams)
    this.actionTypeService.getEntities().subscribe(actions => {this.actionTypeList = actions});    
  }
  addAtionType(actionType: ActionType) {
    this.actionTypeList = [...this.actionTypeList, actionType];
  }
  deleteActionType() {
    this.actionTypeService.deleteEntity(this.action.id).subscribe();
  }
}
