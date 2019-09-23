import { Component, ViewChild, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Issue } from 'src/app/modules/shared/models/issue';
import { IssueService } from 'src/app/modules/shared/services/issue.service';
import { Priority } from '../../models/priority/priority';
import { DatatableSettings } from 'src/app/modules/shared/helpers/datatable-settings';
import { TranslateService, LangChangeEvent, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnDestroy, AfterViewInit, OnInit {
  readonly options: DatatableSettings = new DatatableSettings({
    ajax: (dataTablesParameters: any, callback) => {
      this.issueService.getFilteredEntities(dataTablesParameters).subscribe(response => {
        this.issues = response.data;
        callback({ ...response, data: [] });
        this.adjustColumns();
      });
    },
    columns: [
      { title: this.translateColumns(0), data: 'number' },
      { title: this.translateColumns(1), data: 'state.transName' },
      { title: this.translateColumns(2), data: 'vehicle.model' },
      { title: this.translateColumns(3), data: 'malfunction.name' },
      { title: this.translateColumns(4), data: 'date' },
      { title: this.translateColumns(5), data: 'summary' },
      { title: this.translateColumns(6), data: null, orderable: false }
    ],
    order: [[1, 'asc']],
    serverSide: true,
    processing: true,
    retrieve: true,
  });

  issues: Issue[] = [];
  selectedIssue: Issue;
  renderTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;

  constructor(private issueService: IssueService, private translate: TranslateService) {}

  translateColumns(i : any): string{
    let colNames = ['Register.Number',
    'Register.Transport',
    'Register.Status',
    'Register.Malfunction',
    'Register.Date',
    'Register.Description',
    'Register.Action'];
    let tr = this.translate.instant(colNames[i]);
    return tr;
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

  ngOnInit(): void {
    var dtable = $('#issues').DataTable(this.options);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      let currentLang = (event.lang == "uk") ? "//cdn.datatables.net/plug-ins/505bef35b56/i18n/Ukranian.json" : "//cdn.datatables.net/plug-ins/505bef35b56/i18n/English.json";
      dtable.destroy();
      this.initializeOption(currentLang);
      dtable = $('#issues').DataTable( this.options);
    });
  }
  

  private initializeOption(currentLang: string) {
    this.options.language.url = currentLang;
    this.options.oLanguage.url = currentLang;
    this.options.oLanguage.sUrl = currentLang;
    this.options.aoColumns = [
      { title: this.translateColumns(0), data: 'number' },
      { title: this.translateColumns(1), data: 'state.transName' },
      { title: this.translateColumns(2), data: 'vehicle.model' },
      { title: this.translateColumns(3), data: 'malfunction.name' },
      { title: this.translateColumns(4), data: 'date' },
      { title: this.translateColumns(5), data: 'summary' },
      { title: this.translateColumns(6), data: null, orderable: false }
    ];
  }
}
