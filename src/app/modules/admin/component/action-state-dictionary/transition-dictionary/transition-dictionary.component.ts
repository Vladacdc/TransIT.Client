import { Component, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Transition } from '../../../../shared/models/transition';
import { TransitionService } from 'src/app/modules/shared/services/transition.service';
import { DatatableSettings } from 'src/app/modules/shared/helpers/datatable-settings';

@Component({
  selector: 'app-transition-dictionary',
  templateUrl: './transition-dictionary.component.html',
  styleUrls: ['./transition-dictionary.component.scss']
})
export class TransitionDictionaryComponent implements OnDestroy, AfterViewInit {
  readonly options = new DatatableSettings({
    ajax: (dataTablesParameters: any, callback) => {
      this.transitionService.getFilteredEntities(dataTablesParameters).subscribe(response => {
        this.transitions = response.data;
        callback({ ...response, data: [] });
        this.adjustColumns();
      });
    },
    columns: [
      { data: 'fromState.name' },
      { data: 'toState.name' },
      { data: 'actionType.name' },
      { data: null, orderable: false }
    ]
  });

  transitions: Transition[] = [];
  selectedTransition: Transition;
  renderTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;

  constructor(private transitionService: TransitionService) {}

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

  selectTransition(transition: Transition) {
    this.selectedTransition = { ...transition };
  }

  isDeletable(transition: Transition): boolean {
    return !transition.isFixed;
  }

  private adjustColumns() {
    setTimeout(() => $(window).trigger('resize'), 0);
  }
}
