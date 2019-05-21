import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/modules/shared/models/employee';
import { IssueLog } from 'src/app/modules/shared/models/issuelog';
import { Supplier } from 'src/app/modules/shared/models/supplier';
import { ActionType } from 'src/app/modules/shared/models/action-type';
import { State } from 'src/app/modules/shared/models/state';
import { IssueService } from 'src/app/modules/shared/services/issue.service';
import { IssuelogService } from 'src/app/modules/shared/services/issuelog.service';
import { ActionTypeService } from 'src/app/modules/shared/services/action-type.service';
import { StateService } from 'src/app/modules/shared/services/state.service';
import { SupplierService } from 'src/app/modules/shared/services/supplier.service';
import { DocumentService } from 'src/app/modules/shared/services/document.service';
import { Document } from 'src/app/modules/shared/models/document';

@Component({
  selector: 'app-edit-issue-log',
  templateUrl: './edit-issue-log.component.html',
  styleUrls: ['./edit-issue-log.component.scss']
})
export class EditIssueLogComponent implements OnInit {
  issueLog: IssueLog;
  assigneeUser: Employee;
  supplier: Supplier;
  actionTypes: Array<ActionType>;
  states: Array<State>;
  suppliers: Array<Supplier>;
  issueLogForm: FormGroup;
  documents: Array<Document>;

  constructor(
    private router: Router,
    private issueService: IssueService,
    private issueLogService: IssuelogService,
    private actionTypeService: ActionTypeService,
    private stateService: StateService,
    private supplierService: SupplierService,
    private documentService: DocumentService,
    private toast: ToastrService
  ) {
    this.documents = new Array<Document>();
    this.issueLogForm = new FormGroup({
      state: new FormControl('', Validators.compose([Validators.required, Validators.nullValidator])),
      actionType: new FormControl('', Validators.compose([Validators.required, Validators.nullValidator])),
      expenses: new FormControl('', Validators.nullValidator),
      summary: new FormControl('', Validators.compose([Validators.nullValidator, Validators.maxLength(512)])),
      supplier: new FormControl('', Validators.nullValidator),
      deadLine: new FormControl('')
    });
  }

  ngOnInit() {
    const selectedIssue = this.issueService.selectedItem;
    this.issueLog = new IssueLog({
      id: 0,
      description: '',
      expenses: 0,
      actionType: new ActionType({}),
      supplier: new Supplier({}),
      issue: selectedIssue,
      oldState: selectedIssue.state,
      newState: selectedIssue.state
    });
    if (!this.issueLog.issue) {
      this.router.navigate(['/engineer/issues']);
    }
    this.actionTypeService.getEntities().subscribe(actions => (this.actionTypes = actions));
    this.stateService.getEntities().subscribe(states => (this.states = states));
    this.supplierService.getEntities().subscribe(suppliers => (this.suppliers = suppliers));
  }

  assignDocument(entity: Document): void {
    if (this.documents.some(value => value.name === entity.name)) {
      this.toast.error("Документ з таки самим ім'ям вже існує", 'Дублювання');
      return;
    }
    entity.issueLog = this.issueLog;
    this.documents.push(entity);
  }

  assignAssignee(entity: Employee): void {
    this.issueLog.issue.assignedTo = entity;
  }

  assignSupplier(entity: Supplier): void {
    this.issueLog.supplier = entity;
  }

  assignActionType(entity: ActionType): void {
    this.issueLog.actionType = entity;
  }

  assignState(entity: State): void {
    this.issueLog.newState = entity;
  }

  deleteDocument(entity: Document): void {
    this.documents = this.documents.filter(x => x.name !== entity.name);
  }

  onSubmit(): void {
    if (this.issueLogForm.invalid) {
      this.toast.error('Не правильно введені дані!', 'Помилка');
      return;
    }

    this.issueLog.id = 0;
    this.issueLog.issue.deadline = this.issueLogForm.value.deadline
      ? this.issueLog.issue.deadline
      : this.issueLogForm.value.deadline;
    this.issueLogService.addEntity(this.issueLog).subscribe(res => {
      if (this.documents.length) {
        this.documents.forEach(d => {
          d.issueLog = res;
          this.documentService.addEntity(d).subscribe();
        });
      }
      this.router.navigate(['/engineer/issue-logs']).then(_ => this.toast.success('', 'Обробку зроблено'));
    });
  }
}
