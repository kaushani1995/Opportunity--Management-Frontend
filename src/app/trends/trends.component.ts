import { Component, OnInit } from '@angular/core';
import { ServerApisService } from '../server-apis.service';
import { Router } from '@angular/router';
import { Trend } from '../models';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {

  constructor(private serverApis: ServerApisService, private router: Router) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[];

  doughnutChartLabels: Label[];
  doughnutChartData: MultiDataSet;
  doughnutChartType: ChartType = 'doughnut';

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[];
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  ngOnInit(): void {

    this.serverApis.getTrend("location").subscribe((trd: Trend) => {
      this.doughnutChartLabels = trd.name;
      this.doughnutChartData = [trd.count];
      console.log(trd);
    });

    this.serverApis.getTrend("skill").subscribe((trd: Trend) => {
      this.barChartLabels = trd.name;
      this.barChartData = [{ data: trd.count , label: 'Skills' }];
      console.log(trd.name);
    });
    this.serverApis.getTrend("team").subscribe((trd: Trend) => {
      this.pieChartLabels = trd.name;
      this.pieChartData = trd.count;
      console.log(trd);
    });

  }

  
  home(){
    this.router.navigate(['/home']);
  }

}
