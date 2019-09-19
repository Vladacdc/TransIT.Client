import { Component, ViewChild, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Issue } from 'src/app/modules/shared/models/issue';
import { IssueService } from 'src/app/modules/shared/services/issue.service';
import { Priority } from '../../models/priority/priority';
import { DatatableSettings } from 'src/app/modules/shared/helpers/datatable-settings';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { malfunctionSelectedValidator } from 'src/app/custom-errors';
@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnDestroy, AfterViewInit {
  readonly options: DatatableSettings = new DatatableSettings({
    ajax: (dataTablesParameters: any, callback) => {
      this.issueService.getFilteredEntities(dataTablesParameters).subscribe(response => {
        this.issues = response.data;
        callback({ ...response, data: [] });
        this.adjustColumns();
      });
    },
    columns: [
      { data: 'number' },
      { data: 'vehicle.model' },
      { data: 'state.transName' },
      { data: 'malfunction.name' },
      { data: 'date' },
      { data: 'summary' },
      { data: null, orderable: false }
    ],
    language: {
      url: 'assets/language.json'
    },
    order: [[0, 'desc']],
    serverSide: true,
    processing: true
  });



  controls: any[] = [
    {
      containerType: "date",
      formControlName: "date",
      placeHolder: "Дата заявки",
      labelName: "Дата заявки",
      required: true
    },
    {
      containerType: "select",
      formControlName: "vehicleType",
      placeHolder: "Виберіть вид транспорту",
      labelName: "Вид транспорту",
      required: true
    },
    {
      containerType: "select",
      formControlName: "vehicle",
      placeHolder: "Виберіть транспорт",
      labelName: "Транспорт",
      required: false
    },

    {
      containerType: "select",
      formControlName: "malfunctionGroup",
      placeHolder: "Виберіть групу несправності",
      labelName: "Група несправності",
      required: false
    },
    {
      containerType: "select",
      formControlName: "malfunction",
      placeHolder: "Виберіть несправність",
      labelName: "Несправність",
      required: false
    },
    {
      containerType: "select",
      formControlName: "summary",
      placeHolder: "Опишіть вашу поломку",
      labelName: "Опис несправності",
      required: true
    },
    {
      containerType: "textarea",
      formControlName: "date",
      placeHolder: "Дата заявки",
      labelName: "Дата заявки",
      required: true
    },
  ];
  issueForm: FormGroup;
  issues: Issue[] = [];
  selectedIssue: Issue;
  renderTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;

  constructor(private fb: FormBuilder,
              private issueService: IssueService) {}

  ngOnOnit() {
    this.setUpForm();
  }

  ngAfterViewInit(): void {
    this.renderTrigger.next();
  }

  ngOnDestroy(): void {
    this.renderTrigger.unsubscribe();
  }

  reloadTable(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.renderTrigger.next();
    });
  }

  selectIssue(issue: Issue) {
    this.selectedIssue = new Issue({ ...issue });
  }

  getPriorityClass(issue: Issue) {
    return `priority-${Priority[issue.priority]}`;
  }

  private adjustColumns() {
    setTimeout(() => $(window).trigger('resize'), 0);
  }

  private setUpForm() {
    this.issueForm = this.fb.group(
      {
        vehicleType: [null, Validators.required],
        vehicle: [{ value: null, disabled: true }, Validators.required],
        malfunctionGroup: null,
        malfunctionSubgroup: [{ value: null, disabled: true }],
        malfunction: [{ value: null, disabled: true }],
        date: [new Date(), Validators.required],
        summary: ['', Validators.required]
      },
      { validators: malfunctionSelectedValidator }
    );
  }
}
