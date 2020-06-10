import { Component, OnInit } from '@angular/core';
import { ServerApisService } from '../server-apis.service';
import { Router } from '@angular/router';
import { Trend } from '../models';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {

  constructor(private serverApis: ServerApisService, private router: Router) { }

  skillTrend : Trend;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Skills' }
  ];

  ngOnInit(): void {

    this.serverApis.getTrend("location").subscribe((trd: Trend) => {
      console.log(trd);
    });

    this.serverApis.getTrend("skill").subscribe(
      function (x) {
        console.log(x);
        this.skillTrend = x;
      },
      function (err) {
        console.log('Error: %s', err);
      },
      function () {
      this.barChartLabels = this.skillTrend.names;
      this.barChartData = [{ data: this.skillTrend.counts , label: 'Skills' }]
      }
    );

    /*this.serverApis.getTrend("skill").subscribe((trd: Trend) => {
      this.barChartLabels = ['Apcszple', 'Banacszna', 'Kiwisczfruit', 'Blvcxueberry', 'dOrange', ];
      this.barChartData = [
        { data: [5, 7, 6, 7, 6, 3], label: 'Skills' }
      ];
      //this.barChartLabels = trd.names;
      //this.barChartData = [{ data: trd.counts , label: 'Skills' }];
      console.log(trd.names.length);
    });*/
    this.serverApis.getTrend("team").subscribe((trd: Trend) => {
      console.log(trd);
    });

  }

  
  home(){
    this.router.navigate(['/home']);
  }

}
