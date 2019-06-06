import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/modules/shared/models/employee';
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
import { EmployeeService } from 'src/app/modules/shared/services/employee.service';

@Component({
  selector: 'app-edit-issue-log',
  templateUrl: './edit-issue-log.component.html',
  styleUrls: ['./edit-issue-log.component.scss']
})
export class EditIssueLogComponent implements OnInit {
  actionTypes: Array<ActionType>;
  states: Array<State>;
  suppliers: Array<Supplier>;
  users: Array<Employee>;
  issueLogForm: FormGroup;

  documents: Array<Document> = new Array<Document>();
  existingDocuments: Array<Document> = new Array<Document>();
  shownDocuments: Array<Document> = new Array<Document>();

  get isStatesDisabled(): boolean {
    return !this.issueLogForm.value.actionType
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
    private employeeService: EmployeeService,
    private toast: ToastrService
  ) {
    this.documents = new Array<Document>();
    this.issueLogForm = new FormGroup({
      expenses: new FormControl(0, Validators.nullValidator),
      description: new FormControl('', Validators.compose([Validators.nullValidator, Validators.maxLength(512)])),
      actionType: new FormControl(null, Validators.compose([Validators.required, Validators.nullValidator])),
      oldState: new FormControl(null),
      newState: new FormControl(null, Validators.nullValidator),
      supplier: new FormControl(null),
      issue: new FormGroup({
        id: new FormControl(-1),
        state: new FormControl(null),
        deadLine: new FormControl(null),
        assignedTo: new FormControl(null)
      })
    });
  }

  ngOnInit() {
    const issue = new Issue(this.issueService.selectedItem);
    this.issueLogForm.patchValue({
      issue: issue,
      oldState: issue.state,
      newState: issue.state
    });
    if (!this.issueLogForm.value.issue) {
      this.router.navigate(['/engineer/issues']);
    }
    this.supplierService.getEntities().subscribe(suppliers => this.suppliers = suppliers);
    this.employeeService.getEntities().subscribe(employees => this.users = employees);
    this.loadActionTypes();
  }

  private loadActionTypes(): void {
    this.transitionService.getFilteredEntities({
      filters: [
        {
          entityPropertyPath: 'fromState.id',
          value: this.issueLogForm.value.issue.state.id,
          operator: '=='
        }
    ]
    }).subscribe(transitions => {
      this.actionTypes = this.distinct(transitions.data.map(t => t.actionType));
      if (!this.actionTypes.length) {
        this.toast.warning(
          `Спробуйте додати перехід для поточного стану '${this.issueLogForm.value.oldState.transName}'`,
          'Заявку неможливо перевести в інший стан'
          );
      }
      this.states = this.distinct(transitions.data.map(t => t.toState));
      this.issueLogForm.patchValue({
        ...this.issueLogForm.value,
        actionType: this.actionTypes[0],
        newState: this.states[0]
      });
    });
  }

  private loadNewStates(): void {
    if (this.issueLogForm.value.actionType) {
      this.transitionService.getFilteredEntities({
        filters: [
          {
            entityPropertyPath: 'fromState.id',
            value: this.issueLogForm.value.oldState.id,
            operator: '=='
          },
          {
            entityPropertyPath: 'actionType.id',
            value: this.issueLogForm.value.actionType.id,
            operator: '=='
          }
      ]
      }).subscribe(transitions => {
        this.states = this.distinct(transitions.data.map(t => t.toState));
        this.issueLogForm.patchValue({
          ...this.issueLogForm.value,
          newState: this.states[0]
        });
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
      this.toast.error('Документ з таки самим ім\'ям вже існує', 'Дублювання');
      return;
    }
    entity.issueLog = this.issueLogForm.value;
    this.documents.push(entity);
    this.shownDocuments.push(entity);
  }

  assignExistingDocument(entity: Document): void {
    if (this.shownDocuments && this.shownDocuments.length >= 5) {
      this.toast.warning('Дозволено 5 документів', 'Забагато документів');
      return;
    } else if (this.documents
      && this.documents.some(value => value.name === entity.name)
      || this.existingDocuments
      && this.existingDocuments.some(value => value.name === entity.name)) {
      this.toast.error('Документ з таки самим ім\'ям вже існує', 'Дублювання');
      return;
    }
    entity.issueLog = this.issueLogForm.value;
    this.existingDocuments.push(entity);
    this.shownDocuments.push(entity);
  }

  assignActionType(): void {
    this.loadNewStates();
  }

  assignAssignee(item: Employee): void {
    this.issueLogForm.patchValue({
      ...this.issueLogForm.value,
      issue: {
        ...this.issueLogForm.value.issue,
        assignedTo: item
      }
    });
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

    this.issueLogService.addEntity(this.issueLogForm.value).subscribe(res => {
      if (this.documents.length) {
        this.documents.forEach(d => {
          d.issueLog = res;
          this.documentService.addEntity(d).subscribe();
        });
      }
      if (this.existingDocuments.length) {
        this.existingDocuments.forEach(d => {
          d.issueLog = res;
          this.documentService.updateEntity(d).subscribe()
        });
      }
      this.router.navigate(['/engineer/issues/edit'])
        .then(_ => this.toast.success('', 'Обробку зроблено'))
        .catch(_ => this.toast.error('', 'Обробку не зроблено'));
    });
  }
}

