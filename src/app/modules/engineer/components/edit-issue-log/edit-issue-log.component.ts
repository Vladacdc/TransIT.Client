import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IssueLog} from '../../models/issuelog';
import {ActivatedRoute, Router} from '@angular/router';
import {IssuelogService} from '../../services/issuelog.service';
import {ActionType} from '../../models/actionType';
import {Document} from '../../models/document';
import {ActionTypeService} from '../../services/action-type.service';
import {StateService} from '../../services/state.service';
import {State} from '../../models/state';
import {Supplier} from '../../models/supplier';
import {SupplierService} from '../../services/supplier.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Issue} from '../../models/issue';
import {DocumentService} from '../../services/document.service';
import {User} from '../../models/user';
import {IssueService} from '../../services/issue.service';

@Component({
  selector: 'app-edit-issue-log',
  templateUrl: './edit-issue-log.component.html',
  styleUrls: ['./edit-issue-log.component.scss']
})
export class EditIssueLogComponent implements OnInit {

  public issueLog: IssueLog;
  public assigneeUser: User;
  public supplier: Supplier;
  public actionTypes: Array<ActionType>;
  public states: Array<State>;
  public suppliers: Array<Supplier>;
  public issueLogForm: FormGroup;
  public documents: Array<Document>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private issueService: IssueService,
    private issueLogService: IssuelogService,
    private actionTypeService: ActionTypeService,
    private stateService: StateService,
    private supplierService: SupplierService,
    private documentService: DocumentService
  ) {
    this.documents = new Array<Document>();
    this.issueLogForm = new FormGroup({
      state: new FormControl('', Validators.compose([Validators.required, Validators.nullValidator])),
      actionType: new FormControl('', Validators.compose([Validators.required, Validators.nullValidator])),
      expenses: new FormControl('', Validators.nullValidator),
      summary: new FormControl('', Validators.compose([Validators.nullValidator, Validators.maxLength(512)])),
      supplier: new FormControl('', Validators.nullValidator),
      deadLine: new FormControl(''),
    });
  }

  private createIssueLog(): IssueLog {
    return new IssueLog(
      0,
      '',
      0,
      new ActionType(),
      null,
      new State(),
      new State(),
      new Supplier());
  }

  ngOnInit() {
    this.issueLog = this.createIssueLog();
    this.activatedRoute.params.subscribe(params => {
      const issue = params;
      if (issue) {
        this.issueService.getEntity(issue.id).subscribe((res: Issue) => {
          this.issueLog.issue = res;
          this.issueLog.oldState = this.issueLog.newState = res.state;
        });
      } else {
        this.router.navigate(['/engineer/issues']);
      }
    });
    this.actionTypeService.getEntities().subscribe(actions => {
      this.actionTypes = actions;
    });
    this.stateService.getEntities().subscribe(states => {
      this.states = states;
    });
    this.supplierService.getEntities().subscribe(suppliers => {
      this.suppliers = suppliers;
    });
  }

  public assignDocument(entity: Document): void {
    this.documents.push(entity);
  }

  public assignAssignee(entity: User): void {
    this.assigneeUser = entity;
  }

  public assignSupplier(entity: Supplier): void {
    this.supplier = entity;
  }

  public deleteDocument(entity: Document): void {
    this.documents = this.documents.filter(x => x.id === entity.id);
  }

  public onSubmit(): void {
    if (this.issueLogForm.invalid) {
      alert('Не правильно введені дані!');
      return;
    }
    this.issueLog.id = 0;
    this.issueLog.issue.deadline = this.issueLogForm.value.deadline
      ? this.issueLog.issue.deadline
      : this.issueLogForm.value.deadline;
    this.issueLog.newState = new State(
      this.issueLogForm.value.state || this.issueLog.issue.state.id);
    this.issueLog.supplier = this.supplier;
    if (this.assigneeUser) {
      this.issueLog.issue.assignedTo = this.assigneeUser;
    }
    this.issueLogService.addEntity(this.issueLog).subscribe(res => {
      if (this.documents.length) {
        this.documents.forEach(d => {
          d.issueLog = { id: res.id };
          this.documentService.addEntity(d).subscribe();
        });
      }
      this.router.navigate(['/engineer/issue-logs']).then();
    });
  }
}
