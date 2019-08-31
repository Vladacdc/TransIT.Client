import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';
import { StatisticsService } from 'src/app/modules/shared/services/statistics.service';


@Component({
  selector: 'charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  private barChartReady: boolean;
  private pieChartReady: boolean;

  public currentMalfunction: string = "зникли поручні";

  //public chartColors: string[];

  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType: string;
  
  constructor(
    private vehicleTypeService: VehicleTypeService,
    private statisticsService: StatisticsService) {
      //this.chartColors=[];
      this.barChartReady=false;
      this.pieChartReady=false;
      this.pieChartLabels=[];// = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
      this.pieChartData=[];
      this.pieChartType='pie';
  }
  

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  

  ngOnInit() {
    this.loadPieChartData();
  }

  loadPieChartData() {
    this.vehicleTypeService.getEntities().subscribe(vehicleTypes => {
      vehicleTypes.forEach(vType => {
        this.pieChartLabels.push(vType.name);
      });
      
    });

    this.statisticsService.GetMalfunctionStatistics(this.currentMalfunction).subscribe(data => {
      this.pieChartData = data;
      //this.generateColors(this.pieChartLabels.length);
      this.pieChartReady = true;
    });
  }

  /*
  private generateColors(amount: number) {
    for(let i=0; i<amount; i++) {
      this.chartColors.push(this.getRandomColor());
    }
  }
  
  private getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }*/
}
