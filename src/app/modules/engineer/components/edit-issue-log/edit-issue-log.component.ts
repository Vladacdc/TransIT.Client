import {Component, Input, OnInit} from '@angular/core';
import {IssueLog} from '../../models/issuelog';
import {ActivatedRoute, Router} from '@angular/router';
import {IssuelogService} from '../../services/issuelog.service';
import {ActionType} from '../../models/actionType';
import {ActionTypeService} from '../../services/action-type.service';
import {StateService} from '../../services/state.service';
import {State} from '../../models/state';
import {Supplier} from '../../models/supplier';
import {SupplierService} from '../../services/supplier.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Issue} from '../../models/issue';

@Component({
  selector: 'app-edit-issue-log',
  templateUrl: './edit-issue-log.component.html',
  styleUrls: ['./edit-issue-log.component.scss']
})
export class EditIssueLogComponent implements OnInit {

  public issueLog: IssueLog;
  public actionTypes: Array<ActionType>;
  public states: Array<State>;
  public suppliers: Array<Supplier>;
  public issueLogForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private issueLogService: IssuelogService,
    private actionTypeService: ActionTypeService,
    private stateService: StateService,
    private supplierService: SupplierService
  ) {
    this.issueLog = this.createIssueLog();
    this.issueLogForm = new FormGroup({
      state: new FormControl('', Validators.compose([Validators.required, Validators.nullValidator])),
      actionType: new FormControl('', Validators.compose([Validators.required, Validators.nullValidator])),
      expenses: new FormControl('', Validators.nullValidator),
      summary: new FormControl('', Validators.compose([Validators.nullValidator, Validators.maxLength(512)])),
      supplier: new FormControl('', Validators.nullValidator),
    });
  }

  private createIssueLog(): IssueLog {
    return new IssueLog(
      0,
      '',
      0,
      new ActionType(),
      new Issue(),
      new State(),
      new State(),
      new Supplier());
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const issue = params;
      if (issue) {
        this.issueLog.issue = { id: issue.id };
        this.issueLog.oldState = { id: issue.state.id };
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

  public onSubmit(): void {
    if (this.issueLogForm.invalid) {
      alert('Invalid info!');
      return;
    }
    this.issueLog.supplier = this.issueLog.supplier.id == null
      ? null
      : this.issueLog.supplier;
    this.issueLogService.addEntity(this.issueLog).subscribe(() => {
      this.issueLog = this.createIssueLog();
      this.router.navigate(['/engineer/issue-logs']).then();
    });
  }
}
