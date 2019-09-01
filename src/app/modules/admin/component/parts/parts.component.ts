import { Component, OnInit, ViewChild } from '@angular/core';
import { PartService } from 'src/app/modules/shared/services/part.service';
import { Part } from 'src/app/modules/shared/models/part';
import { EntitiesDataSource } from '../../../shared/data-sources/entities-data-sourse';
import { MatFspTableComponent } from '../../../shared/components/tables/mat-fsp-table/mat-fsp-table.component';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements OnInit {
  columnDefinitions: string[] = [
    'name',
    'code',
    'manufacturerName',
    'unitName'
  ];
  columnNames: string[] = [
    'Admin.Parts.Name',
    'Admin.Parts.Code',
    'Admin.Parts.Manufacturer',
    'Admin.Parts.Units'
  ];

  @ViewChild('table') table: MatFspTableComponent;

  dataSource: EntitiesDataSource<Part>;

  constructor(private partService: PartService) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Part>(this.partService);
  }

  addPart(part: Part) {
    this.table.loadEntitiesPage();
  }

  deletePart(part: Part) {
    this.table.loadEntitiesPage();
  }

  updatePart(part: Part) {
    this.table.loadEntitiesPage();
  }
}
