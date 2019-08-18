import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';
import { StatisticsService } from 'src/app/modules/shared/services/statistics.service';
import { Statistics } from 'src/app/modules/shared/models/statistics';
import { VehicleType } from 'src/app/modules/shared/models/vehicleType';

const MY_DATA: Statistics[] = [
  {
    fieldName: "Зламані мої поручні",
    statistics: [1,2,3,4]
  },
  {
    fieldName: "Зникли мої поручні",
    statistics: [4,3,2,1]
  },
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
      this.displayedColumns = ["malfunction"];
      data.forEach(vType => {
        this.displayedColumns.push(vType.name);
      });
    });

    /*this.statisticsService.GetAllMalfunctionsStatistics("Поручні").subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    */
   this.dataSource = new MatTableDataSource(MY_DATA);
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
