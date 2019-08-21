import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EntitiesDataSource } from '../../../data-sources/entities-data-sourse';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'mat-fsp-table',
  templateUrl: './mat-fsp-table.component.html',
  styleUrls: ['./mat-fsp-table.component.scss']
})
export class MatFspTableComponent implements OnInit {
  columnsToDisplay: string[];

  @Input() columnDefinitions: string[];
  @Input() columnNames: string[];
  @Input() dataSource: EntitiesDataSource<any>;
  @Input() numberOfRows: number = 100;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor() {
  }

  ngOnInit() {
    /*
    var t = 0 < 1;
    if(t.toString()=="true") {
      this.columnsToDisplay = this.columnDefinitions.concat("buttonsColumn");
    }*/
    this.columnsToDisplay = this.columnDefinitions.concat("buttonsColumn");
    this.dataSource.loadEntities('', null, 0, 3);
  }
  
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement,'keyup').pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.loadEntitiesPage();
      })
    ).subscribe();

    merge(this.sort.sortChange, this.paginator.page).pipe(
      tap(() => this.loadEntitiesPage())
    ).subscribe();
  }

  loadEntitiesPage() {
    this.dataSource.loadEntities(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

}
