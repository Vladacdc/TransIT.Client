import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';
import { StatisticsService, CreateMatTableRowFromStatistics } from 'src/app/modules/shared/services/statistics.service';
import { Statistics } from 'src/app/modules/shared/models/statistics';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'malfunction-group-report',
  templateUrl: './malfunction-group-report.component.html',
  styleUrls: ['./malfunction-group-report.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MalfunctionGroupReportComponent implements OnInit {  
 
  displayedColumns: string[];
  dataSource: MatTableDataSource<Statistics>;

  expandedElement: any | null;

  @Input("startDate") startDate: Date;
  @Input("endDate") endDate: Date;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(
      private statisticsService: StatisticsService,
      private vehicleTypeService: VehicleTypeService
  ) {
    this.dataSource = null;
  }

  ngOnInit() {
    this.vehicleTypeService.getEntities().subscribe(data => {
      this.displayedColumns = ["Група несправності"];
      data.forEach(vType => {
        this.displayedColumns.push(vType.name);
      });
    });

    this.statisticsService.GetAllMalfunctionGroupsStatistics(this.startDate, this.endDate).subscribe(data => {
      let rows = [];
      data.forEach(row => {
        rows.push(CreateMatTableRowFromStatistics(row, this.displayedColumns));
      });

      this.dataSource = new MatTableDataSource(rows);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCurrentGroup(element: any)
  {
    return element[this.displayedColumns[0]];
  }
}
