import { Component, OnInit } from '@angular/core';
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

  public pieChartReady: boolean;

  public malfunctions: Malfunction[];
  public currentMalfunction: Malfunction;

  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType: string;
  
  constructor(
    private vehicleTypeService: VehicleTypeService,
    private malfunctionService: MalfunctionService,
    private statisticsService: StatisticsService) {
      this.pieChartReady=false;
      this.pieChartLabels=[];
      this.pieChartData=[];
      this.pieChartType='pie';
  }

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
