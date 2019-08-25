import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Part } from 'src/app/modules/shared/models/part';
import { PartService } from 'src/app/modules/shared/services/part.service';
import { DatatableSettings } from 'src/app/modules/shared/helpers/datatable-settings';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements AfterViewInit, OnDestroy {
  readonly options = new DatatableSettings({
    ajax: (dataTablesParameters: any, callback) => {
      this.partService.getFilteredEntities(dataTablesParameters).subscribe(response => {
        this.parts = response.data;
        callback({ ...response, data: [] });
        this.adjustColumns();
      });
    },
    columns: [
        { data: 'name' }, 
        { data: 'code' }, 
        { data: 'manufacturer.name' }, 
        { data: 'unit.name' }, 
        { data: null, orderable: false }
    ],
    language: { url: 'assets/language.json'},
    serverSide: true,
    processing: true
  });

  parts: Part[] = [];
  selectedPart: Part;
  renderTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;

  constructor(private partService: PartService) {}

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

  selectPart(part: Part) {
    this.selectedPart = { ...part };
  }

  private adjustColumns() {
    setTimeout(() => $(window).trigger('resize'), 0);
  }
}
