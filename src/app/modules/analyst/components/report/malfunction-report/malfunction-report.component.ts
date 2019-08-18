import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';
import { StatisticsService } from 'src/app/modules/shared/services/statistics.service';
import { Statistics } from 'src/app/modules/shared/models/statistics';
import { VehicleType } from 'src/app/modules/shared/models/vehicleType';

function CreateMatTableRowFromStatistics(statistics: Statistics, columns: string[]): {}
{
  let dict = {};
  let i = 0;
  dict[columns[i]] = statistics.fieldName;
  statistics.statistics.forEach(num => {
    i += 1;
    dict[columns[i]] = num;
  });

  return dict;
}

const MY_ROWS: Statistics[] = [
  {
    fieldName: "Зламані мої поручні",
    statistics: [1,2,3,4]
  },
  {
    fieldName: "Зникли мої поручні",
    statistics: [4,3,2,1]
  },
]

/*const MY_COLS: string[] = [
  "Malfunction",
  "Troleibus",
  "Tramvai",
  "Electrobus",
  "Avtobus"
]*/
const MY_COLS: string[] = [
  "Несправність",
  "Тролейбус T3L",
  "Трамвай",
  "Електробус",
  "Автобус"
]

@Component({
  selector: 'malfunction-report',
  templateUrl: './malfunction-report.component.html',
  styleUrls: ['./malfunction-report.component.scss']
})
export class MalfunctionReportComponent implements OnInit {  
 
  displayedColumns: string[];
  dataSource: MatTableDataSource<Statistics>;
  vehicleTypes: VehicleType[];
  
  @Input("subgroupName") malfunctionSubgroupName: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(
      private statisticsService: StatisticsService,
      private vehicleTypeService: VehicleTypeService
  ) {
    
  }

  ngOnInit() {
    this.vehicleTypeService.getEntities().subscribe(data => {
      this.vehicleTypes = data;
      this.displayedColumns = ["Несправність"];
      data.forEach(vType => {
        this.displayedColumns.push(vType.name);
      });
    });
    //this.displayedColumns = MY_COLS;
    this.statisticsService.GetAllMalfunctionsStatistics(this.malfunctionSubgroupName).subscribe(data => {
      let rows = [];

      data.forEach(row => {
        rows.push(CreateMatTableRowFromStatistics(row, this.displayedColumns));
      });

      this.dataSource = new MatTableDataSource(rows);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    
    /*let rows = [];

    MY_ROWS.forEach(row => {
      rows.push(CreateMatTableRowFromStatistics(row, this.displayedColumns));
    });

    this.dataSource = new MatTableDataSource(rows);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;*/
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
