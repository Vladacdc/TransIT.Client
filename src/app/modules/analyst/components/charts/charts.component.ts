import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';
import { StatisticsService } from 'src/app/modules/shared/services/statistics.service';
import { MalfunctionService } from 'src/app/modules/shared/services/malfunction.service';
import { Malfunction } from 'src/app/modules/shared/models/malfunction';


@Component({
  selector: 'charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  //private barChartReady: boolean;
  private pieChartReady: boolean;

  private malfunctions: Malfunction[];
  public currentMalfunction: Malfunction;

  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType: string;
  
  constructor(
    private vehicleTypeService: VehicleTypeService,
    private malfunctionService: MalfunctionService,
    private statisticsService: StatisticsService) {
      //this.barChartReady=false;
      this.pieChartReady=false;
      this.pieChartLabels=[];
      this.pieChartData=[];
      this.pieChartType='pie';
  }
  
  /*public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];*/

  ngOnInit() {
    this.malfunctionService.getEntities().subscribe(data => {
      this.malfunctions = data;
    })
  }

  selectMalfunction(value: Malfunction): void {
    this.currentMalfunction = value;
    this.loadPieChartData();
  }

  loadPieChartData(): void {
    this.pieChartLabels=[];
    this.vehicleTypeService.getEntities().subscribe(vehicleTypes => {
      vehicleTypes.forEach(vType => {
        this.pieChartLabels.push(vType.name);
      });
    });

    this.statisticsService.GetMalfunctionStatistics(this.currentMalfunction.name).subscribe(data => {
      this.pieChartData = data;
      this.pieChartReady = true;
    });
  }

  pieChartHasNotData(): boolean {
    return this.pieChartReady && this.pieChartData.filter(function(x) { return x != 0; }).length == 0;
  }
}
