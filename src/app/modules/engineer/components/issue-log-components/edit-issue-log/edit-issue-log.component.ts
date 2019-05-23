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
import { SupplierService } from 'src/app/modules/shared/services/supplier.service';
import { DocumentService } from 'src/app/modules/shared/services/document.service';
import { Document } from 'src/app/modules/shared/models/document';
import { TransitionService } from 'src/app/modules/shared/services/transition.service';
import { Issue } from 'src/app/modules/shared/models/issue';

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

  documents: Array<Document> = new Array<Document>();
  existingDocuments: Array<Document> = new Array<Document>();
  shownDocuments: Array<Document> = new Array<Document>();

  private selectedIssue: Issue;

  componentState: any = {
    isDisabled: true,
    states: []
  };

  get isStatesDisabled(): boolean {
    return !this.issueLog.actionType
      || !this.states
      || !this.states.length;
  }

  constructor(
    private router: Router,
    private issueService: IssueService,
    private issueLogService: IssuelogService,
    private transitionService: TransitionService,
    private supplierService: SupplierService,
    private documentService: DocumentService,
    private toast: ToastrService
  ) {
    this.documents = new Array<Document>();
    this.issueLogForm = new FormGroup({
      expenses: new FormControl('', Validators.nullValidator),
      summary: new FormControl('', Validators.compose([Validators.nullValidator, Validators.maxLength(512)])),
      deadLine: new FormControl('')
    });
  }

  ngOnInit() {
    this.selectedIssue = this.issueService.selectedItem;
    this.issueLog = new IssueLog({
      id: 0,
      description: '',
      expenses: 0,
      actionType: null,
      supplier: new Supplier({}),
      issue: this.selectedIssue,
      oldState: this.selectedIssue.state,
      newState: this.selectedIssue.state
    });
    if (!this.issueLog.issue) {
      this.router.navigate(['/engineer/issues']);
    }
    this.issueLog.newState = this.selectedIssue.state;
    this.supplierService.getEntities().subscribe(suppliers => this.suppliers = suppliers);
    this.loadActionTypes();
  }

  private loadActionTypes(): void {
    this.transitionService.getFilteredEntities({
      filters: [
      {
        entityPropertyPath: 'fromState.id',
        value: this.selectedIssue.state.id,
        operator: '=='
      }
    ]
    }).subscribe(transitions => {
      this.actionTypes = this.distinct(transitions.data.map(t => t.actionType));
      this.issueLog.newState = this.distinct(transitions.data.map(t => t.toState))[0];
    });
  }

  private loadNewStates(): void {
    if (this.issueLog.actionType) {
      this.transitionService.getFilteredEntities({
        filters: [
        {
          entityPropertyPath: 'actionType.id',
          value: this.issueLog.actionType.id,
          operator: '=='
        }
      ]
      }).subscribe(transitions => {
        this.states = this.distinct(transitions.data.map(t => t.toState));
        this.issueLog.newState = this.states[0];
      });
    }
  }

  private distinct(array: Array<any>): Array<any> {
    const res = [];
    array.forEach(x => {
      if (!res.find(i => i.id === x.id)) {
        res.push(x);
      }
    });
    return res;
  }

  assignDocument(entity: Document): void {
    if (this.documents
      && this.documents.some(value => value.name === entity.name)
      || this.existingDocuments
      && this.existingDocuments.some(value => value.name === entity.name)) {
      this.toast.error("Документ з таки самим ім'ям вже існує", 'Дублювання');
      return;
    }
    entity.issueLog = this.issueLog;
    this.documents.push(entity);
    this.shownDocuments.push(entity);
  }

  assignExistingDocument(entity: Document): void {
    if (this.shownDocuments && this.shownDocuments.length >= 5) {
      this.toast.warning("Дозволено 5 документів", 'Забагато документів');
      return;
    } else if (this.documents
      && this.documents.some(value => value.name === entity.name)
      || this.existingDocuments
      && this.existingDocuments.some(value => value.name === entity.name)) {
      this.toast.error("Документ з таки самим ім'ям вже існує", 'Дублювання');
      return;
    }
    entity.issueLog = this.issueLog;
    this.existingDocuments.push(entity);
    this.shownDocuments.push(entity);
  }

  assignAssignee(entity: Employee): void {
    this.issueLog.issue.assignedTo = entity;
  }

  assignSupplier(entity: Supplier): void {
    this.issueLog.supplier = entity;
  }

  assignActionType(entity: ActionType): void {
    this.issueLog.actionType = entity;
    this.loadNewStates();
    this.componentState.isDisabled = false;
  }

  assignState(entity: State): void {
    this.issueLog.newState = entity;
  }

  deleteDocument(entity: Document): void {
    const expression = x => x.name !== entity.name;

    this.documents = this.documents.filter(expression);
    this.existingDocuments = this.existingDocuments.filter(expression);
    this.shownDocuments = this.shownDocuments.filter(expression);
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
    this.issueLog.supplier = this.issueLog.supplier.id
      ? this.issueLog.supplier
      : null;
    this.issueLogService.addEntity(this.issueLog).subscribe(res => {
      if (this.documents.length) {
        this.documents.forEach(d => {
          d.issueLog = res;
          this.documentService.addEntity(d).subscribe();
        });
      }
      if (this.existingDocuments.length) {
        this.existingDocuments.forEach(d =>
          this.documentService.addEntity(d).subscribe()
          );
      }
      this.router.navigate(['/engineer/issue-logs'])
        .then(_ => this.toast.success('', 'Обробку зроблено'))
        .catch(_ => this.toast.error('', 'Обробку не зроблено'));
    });
  }
}
