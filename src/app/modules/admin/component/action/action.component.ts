import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { ActionType } from '../../models/action/actiontype';
import { ActionTypeService } from '../../services/actiontype.sevice';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  actionTypeList: ActionType[] = [];
  index: number;
  private actionTypeForm: FormGroup;
  action: ActionType = {
    id: 0,
    name: ''    
  };
  private readonly tableParams: DataTables.Settings = {
    // columnDefs: [
    //   {
    //     //targets: [1,2],
    //     //orderable : false    
    //   }
    // ],
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    }
  };
  constructor(private actionTypeService: ActionTypeService, private chRef: ChangeDetectorRef, private toast: ToastrService) {}
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
      $('table').DataTable(this.tableParams)});    
  }
  addAtionType(actionType: ActionType) {
    this.actionTypeList = [...this.actionTypeList, actionType];
  }
  deleteActionType(index: number) {
    this.actionTypeService.deleteEntity(this.actionTypeList[this.index].id).subscribe(
      res => {this.actionTypeList.splice(this.index, 1)}, error => {
        this.toast.error('Помилка', 'Дія в експлуатації');
      } );
  }
  selectIndex(index: number){
    this.index = index;
    console.log(this.index);
  }
}
