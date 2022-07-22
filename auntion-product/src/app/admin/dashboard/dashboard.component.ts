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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userVisitChart: any;
  defLabelArr: any[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  defDataArr: any[] = [2000, 4000, 5000, 3400, 7000, 8000, 6900, 7050, 9000, 8500, 7300, 9300];

  constructor() {
  }

  ngOnInit(): void {
    const hideNavHp = document.querySelector('#header');
    const hideFooterHp = document.querySelector('.footer__container');
    // @ts-ignore
    // tslint:disable-next-line:no-unused-expression
    hideNavHp.style.display = 'none';
    // @ts-ignore
    // tslint:disable-next-line:no-unused-expression
    hideFooterHp.style.display = 'none';

    this.userVisitChart = new Chart('userVisitChart', {
      type: 'bar',
      data: {
        labels: this.defLabelArr,
        datasets: [{
          label: 'Users bidding in 2022 year',
          data: this.defDataArr,
          backgroundColor: '#11b683'
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true
          },
          y: {
            beginAtZero: true,
            display: true,
            max: 10000
          }
        }
      }
    });
  }

}
