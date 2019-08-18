import { Component, OnInit, ViewChild } from '@angular/core';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';
import { StatisticsService } from 'src/app/modules/shared/services/statistics.service';
import { Statistics } from 'src/app/modules/shared/models/statistics';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { VehicleType } from 'src/app/modules/shared/models/vehicleType';
import { trigger, state, style, animate, transition } from '@angular/animations';


const MY_DATA: Statistics[] = [
  {
    fieldName: "Мій кузов",
    statistics: [1,2,3,4]
  },
  {
    fieldName: "Мій двигун",
    statistics: [1,2,3,4]
  },
]

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
  vehicleTypes: VehicleType[];
  expandedElement: Statistics | null;

 
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
      this.displayedColumns = ["group"];
      data.forEach(vType => {
        this.displayedColumns.push(vType.name);
      });
      /*this.statisticsService.GetAllMalfunctionGroupsStatistics().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });*/
      this.dataSource = new MatTableDataSource(MY_DATA);
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
