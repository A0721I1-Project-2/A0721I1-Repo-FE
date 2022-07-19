import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);
import {registerables} from 'chart.js';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  serverLoadData: any;
  doughnutData: any;
  diskSpaceData: any;
  dropboxData: any;
  Doughnut:any;


  chartOptions: any;

  constructor() {
  }

  // Doughnut = function(data,options){
  //
  //   chart.Doughnut.defaults = {
  //     segmentShowStroke : true,
  //     segmentStrokeColor : "#d6d9dc",
  //     segmentStrokeWidth : 2,
  //     percentageInnerCutout : 70,
  //     animation : true,
  //     animationSteps : 100,
  //     animationEasing : 'easeOutBounce',
  //     animateRotate : true,
  //     animateScale : false,
  //     onAnimationComplete : null
  //   };
  //
  //   var config = (options)? mergeChartConfig(chart.Doughnut.defaults,options) : chart.Doughnut.defaults;
  //
  //   return new Doughnut(data,config,context);
  //
  // };
  ngOnInit(): void {
    this.doughnutData = {
      animationEnabled: true,
      type: 'doughnut',
      toolTip: {
        shared: true
      },
      legend: {
        cursor: 'pointer',
        itemclick: function(e: any) {
          if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      data: [{
        datasets: [{
          data: [70, 30],
          backgroundColor: [
            '#4ECDC4', '#fdfdfd'],
        }],
      }],
    };
    this.diskSpaceData = {
      animationEnabled: true,
      type: 'doughnut',
      toolTip: {
        shared: true
      },
      legend: {
        cursor: 'pointer',
        itemclick: function(e: any) {
          if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      data: [{
        datasets: [{
          data: [70, 30],
          backgroundColor: [
            '#4ECDC4', '#fdfdfd'],
        }],
      }],
    };
    // this.diskSpaceData = {
    //   animationEnabled: true,
    //   type: 'doughnut',
    //   datasets: [{
    //     data: [60, 40],
    //     backgroundColor: [
    //       '#2b2b2b', '#fffffd'],
    //   }],
    // };

    this.dropboxData = {
      animationEnabled: true,
      type: 'doughnut',
      datasets: [{
        data: [60, 40],
        backgroundColor: [
          '#1c9ca7', '#f68275'],
      }],
    };

    // this.serverLoadData = {
    //   animationEnabled: true,
    //   type: 'doughnut',
    //   datasets: [{
    //     data: [70, 30],
    //     backgroundColor: [
    //       '#ff6b6b', '#fdfdfd'],
    //   }],
    // };

    this.serverLoadData = {
      animationEnabled: true,
      type: 'doughnut',
      toolTip: {
        shared: true
      },
      legend: {
        cursor: 'pointer',
        itemclick: function(e: any) {
          if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      data: [{
        datasets: [{
          data: [70, 30],
          backgroundColor: [
            '#ff6b6b', '#fdfdfd'],
        }],
      }],
    };


    // ******************************
    // this.chartOptions = {
    //   animationEnabled: true,
    //   title: {
    //     text: 'Crude Oil Reserves Vs Production'
    //   },
    //   axisX: {
    //     labelAngle: -90
    //   },
    //   axisY: {
    //     title: 'billion of barrels'
    //   },
    //   axisY2: {
    //     title: 'million barrels/day'
    //   },
    //   toolTip: {
    //     shared: true
    //   },
    //   legend: {
    //     cursor: 'pointer',
    //     itemclick: function(e: any) {
    //       if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
    //         e.dataSeries.visible = false;
    //       } else {
    //         e.dataSeries.visible = true;
    //       }
    //       e.chart.render();
    //     }
    //   },
    //   data: [{
    //     type: 'column',
    //     name: 'Proven Oil Reserves (bn)',
    //     legendText: 'Proven Oil Reserves',
    //     showInLegend: true,
    //     dataPoints: [
    //       {label: 'Saudi', y: 262},
    //       {label: 'Venezuela', y: 211},
    //       {label: 'Canada', y: 175},
    //       {label: 'Iran', y: 137},
    //       {label: 'Iraq', y: 115},
    //       {label: 'Kuwait', y: 104},
    //       {label: 'UAE', y: 97.8},
    //       {label: 'Russia', y: 60},
    //       {label: 'US', y: 23.3},
    //       {label: 'China', y: 20.4}
    //     ]
    //   }, {
    //     type: 'column',
    //     name: 'Oil Production (million/day)',
    //     legendText: 'Oil Production',
    //     axisYType: 'secondary',
    //     showInLegend: true,
    //     dataPoints: [
    //       {label: 'Saudi', y: 11.15},
    //       {label: 'Venezuela', y: 2.5},
    //       {label: 'Canada', y: 3.6},
    //       {label: 'Iran', y: 4.2},
    //       {label: 'Iraq', y: 2.6},
    //       {label: 'Kuwait', y: 2.7},
    //       {label: 'UAE', y: 3.1},
    //       {label: 'Russia', y: 10.23},
    //       {label: 'US', y: 10.3},
    //       {label: 'China', y: 4.3}
    //     ]
    //   }]
    // };

  }

}
