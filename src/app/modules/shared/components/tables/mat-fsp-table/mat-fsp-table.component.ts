import { Component, OnInit, ViewChild, Input, ElementRef, ContentChildren, ContentChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EntitiesDataSource } from '../../../data-sources/entities-data-sourse';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatPaginatorIntlUkr } from '../../../paginator-extentions/mat-paginator-intl-ukr';

@Component({
  selector: 'mat-fsp-table',
  templateUrl: './mat-fsp-table.component.html',
  styleUrls: ['./mat-fsp-table.component.scss']
})
export class MatFspTableComponent implements OnInit {
  columnsToDisplay: string[];
  showEdit=false;

  @Input() columnDefinitions: string[];
  @Input() columnNames: string[];
  @Input() dataSource: EntitiesDataSource<any>;
  @Input() enableActions: boolean; //todo
  
  //@ContentChild(MatButton) buttons: MatButton;
  //@ContentChildren('info') info: any;
  //@ContentChildren('edit') edit: any;
  //@ContentChildren('delete') delete: any;
  //@ContentChildren('btn') btn: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  //@ViewChild('thisbtn') thisbtn: any;

  //@ViewChild('editsupplier') editsupplier : EditSupplierComponent;

  constructor() {
  }

  ngOnInit() {
    this.columnsToDisplay = this.columnDefinitions;
    this.paginator._intl = new MatPaginatorIntlUkr();
    this.dataSource.loadEntities('', null, 0, 3, this.paginator);
  }
  
  ngAfterViewInit() {
    
    setTimeout(() => {
      //this.editsupplier=this.edit;
      //this.thisbtn=this.btn.first;
      //if(this.buttons) {
      //if(this.enableActions) {//this.info.length + this.edit.length + this.delete.length > 0) {
        this.columnsToDisplay = this.columnsToDisplay.concat("buttonsColumn");
      //}
    });

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
      this.paginator.pageSize,
    );
  }

  editEntity(entity:any) {
    this.showEdit=!this.showEdit;
    //this.button.label="hi";
  }
}
