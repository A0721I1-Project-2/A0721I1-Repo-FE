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

  doughnutData: any;
  diskSpaceData: any;
  dropboxData: any;
  serverLoadData: any;

  constructor() {
  }

  ngOnInit(): void {
    this.doughnutData = {
      animationEnabled: true,
      type: 'doughnut',
      datasets: [{
        data: [70, 30],
        backgroundColor: [
          '#4ECDC4', '#fdfdfd'],
      }],
    };
    this.diskSpaceData = {
      animationEnabled: true,
      type: 'doughnut',
      datasets: [{
        data: [60, 40],
        backgroundColor: [
          '#2b2b2b', '#fffffd'],
      }],
    };

    this.dropboxData = {
      animationEnabled: true,
      type: 'doughnut',
      datasets: [{
        data: [60, 40],
        backgroundColor: [
          '#1c9ca7', '#f68275'],
      }],
    };

    this.serverLoadData = {
      animationEnabled: true,
      type: 'doughnut',
      datasets: [{
        data: [70, 30],
        backgroundColor: [
          '#ff6b6b', '#fdfdfd'],
      }],
    };
  }
}
