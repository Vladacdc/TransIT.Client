import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';
import { StatisticsService, CreateMatTableRowFromStatistics } from 'src/app/modules/shared/services/statistics.service';
import { Statistics } from 'src/app/modules/shared/models/statistics';
import { MatPaginatorIntlCustom } from 'src/app/modules/shared/paginator-extentions/mat-paginator-intl-custom';
import { TranslateService, TranslateParser, TranslateDefaultParser } from '@ngx-translate/core';

@Component({
  selector: 'malfunction-report',
  templateUrl: './malfunction-report.component.html',
  styleUrls: ['./malfunction-report.component.scss']
})
export class MalfunctionReportComponent implements OnInit {  
 
  displayedColumns: string[];
  dataSource: MatTableDataSource<Statistics>;
  
  @Input("subgroupName") malfunctionSubgroupName: string;
  @Input("startDate") startDate: Date;
  @Input("endDate") endDate: Date;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(
    private statisticsService: StatisticsService,
    private vehicleTypeService: VehicleTypeService,
    private translateService: TranslateService  
  ) {
    this.dataSource = null;
  }

  ngOnInit() {
    this.vehicleTypeService.getEntities().subscribe(data => {
      this.displayedColumns = ["Несправність"];
      data.forEach(vType => {
        this.displayedColumns.push(vType.name);
      });
    });

    this.statisticsService.GetAllMalfunctionsStatistics(this.malfunctionSubgroupName, this.startDate, this.endDate)
    .subscribe(data => {
      let rows = [];
      data.forEach(row => {
        rows.push(CreateMatTableRowFromStatistics(row, this.displayedColumns));
      });

      this.dataSource = new MatTableDataSource(rows);
      this.paginator._intl = new MatPaginatorIntlCustom(this.translateService, new TranslateDefaultParser());
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
}
