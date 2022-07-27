import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Product} from '../../model/Product';
import {ProductService} from '../service/product.service';
import {error} from '@angular/compiler/src/util';
import {Router} from '@angular/router';
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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
})

export class StatisticComponent implements OnInit {


  constructor(private productService: ProductService,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private route: Router) {
  }

  myChart: any;
  statsGroup: FormGroup;
  statsBegin: string;
  statsEnd: string;
  products: any[];
  curMonthProduct: any[];
  reportProduct: any[];
  labelArr: any[];
  dataArr: any[];
  defaultLabelArr: any[];
  defaultDataArr: any[];
  count: number;
  keyword: string;

  message: string = null;
  private locale;

  ngOnInit(): void {

    const hideNavHp = document.querySelector('#header');
    const hideFooterHp = document.querySelector('.footer__container');
    // @ts-ignore
    // tslint:disable-next-line:no-unused-expression
    hideNavHp.style.display = 'none';
    // @ts-ignore
    // tslint:disable-next-line:no-unused-expression
    hideFooterHp.style.display = 'none';

    this.keyword = '';
    this.products = [];
    this.defaultLabelArr = [];
    this.defaultDataArr = [];
    this.statsBegin = this.datePipe.transform('', 'yyyy-MM-dd');
    this.statsEnd = this.datePipe.transform('', 'yyyy-MM-dd');
    this.statsGroup = this.formBuilder.group({
      keyword: new FormControl(''),
      statsBegin: new FormControl(this.datePipe.transform('', 'yyyy-MM-dd'), Validators.required),
      statsEnd: new FormControl(this.datePipe.transform('', 'yyyy-MM-dd'), Validators.required)
    }, this.checkDateDif());
    const localDate = new Date(Date.now());
    console.log(localDate);
    const month = localDate.getMonth() + 1;
    console.log(month);
    this.productService.statsProductAtCurrentMonth(month, 3).subscribe(
      items => {
        for (const i in items) {
          console.log('item: ' + items[i]);
          this.products.push(items[i]);
        }
        // Async
        console.log('products:' + this.products);
        // getDataProduct(this.defaultLabelArr, this.defaultDataArr, this.count, this.products);
        this.products.forEach(val => {
          this.defaultLabelArr.push(val.nameProduct);
          console.log('name_product: ' + val.nameProduct);
          this.defaultDataArr.push(val.finalPrice);
          length++;
        });
        console.log('datas:' + this.defaultDataArr);
        this.myChart = new Chart('myChart', {
            type: 'bar',
            data: {
              labels: this.defaultLabelArr,
              datasets: [{
                label: 'Revenues',
                data: this.defaultDataArr,
                backgroundColor: '#11b683'
              }]
            },
            options: {
              responsive: true,
              scales: {
                x: {
                  display: true,
                },
                y: {
                  beginAtZero: true,
                  display: true,
                  ticks: {
                    callback(value) {
                      return value + 'USD';
                    }
                  }
                }
              },
              plugins: {
                title: {
                  display: true,
                  text: 'Statistic Bar Chart In Current Month',
                  padding: {
                    top: 10,
                    bottom: 30
                  }
                },
              }
            }
          }
        );
      },
      error1 => {
        console.log(error1);
        // this.route.navigateByUrl('/admin/error-500');
      }
    );
    // console.log('products:' + this.products);
    // getDataProduct(this.defaultLabelArr, this.defaultDataArr, this.count, this.products);
    console.log('Array products name in x Axis: Empty- ' + this.defaultLabelArr);
    console.log('Array products finalPrice in y Axis: Empty ' + this.defaultDataArr);
    //  Do not put this code here: cause the Sync
  }

  report() {
    this.message = null;
    this.reportProduct = [];
    this.labelArr = [];
    this.dataArr = [];
    this.keyword = this.statsGroup.get('keyword').value;
    // console.log('keyword:' + typeof this.keyword);
    this.statsBegin = this.statsGroup.get('statsBegin').value;
    this.statsEnd = this.statsGroup.get('statsEnd').value;
    // console.log(this.datePipe.transform(this.statsBeginDate, 'yyyy-MM-dd'));
    // console.log(this.datePipe.transform(this.statsEndDate, 'yyyy-MM-dd'));
    // Check if report too much times and the products get many duplicated values
    if (this.datePipe.transform(this.statsBegin, 'yyyy-MM-dd') <= this.datePipe.transform(this.statsEnd, 'yyyy-MM-dd')) {
      this.productService.statsProductFromDateToDate(this.statsBegin,
        this.statsEnd, 3).subscribe(items => {
          // tslint:disable-next-line:triple-equals
          if (this.keyword != '') {
            for (const i in items) {
              // this.reportProduct.filter((product: Product) => product.nameProduct.includes(this.keyword)).push(items[i]);
              this.reportProduct.push(items[i]);
            }
            this.reportProduct = this.reportProduct.filter(product => product.nameProduct.includes(this.keyword));
          } else {
            for (const i in items) {
              this.reportProduct.push(items[i]);
            }
          }
          this.reportProduct.forEach(val => {
            this.labelArr.push(val.nameProduct);
            // console.log('name_product: ' + val.nameProduct);
            this.dataArr.push(val.finalPrice);
          });
          // console.log('Report products:' + this.reportProduct);
          // getDataProduct(this.labelArr, this.dataArr, this.count, newProducts);
          // console.log('Array products name in x Axis: ' + this.labelArr);
          // console.log('Array products finalPrice in y Axis: ' + this.dataArr);
          if (this.myChart != null) {
            this.myChart.destroy();
          }
          this.myChart = new Chart('myChart', {
            type: 'bar',
            data: {
              labels: this.labelArr,
              datasets: [{
                label: 'Revenues',
                data: this.dataArr,
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
                  ticks: {
                    callback(value) {
                      return value + 'USD';
                    }
                  }
                }
              }, plugins: {
                title: {
                  display: true,
                  text: 'Statistic Bar Chart From ' + this.statsBegin.toString() + ' To ' + this.statsEnd.toString(),
                  padding: {
                    top: 10,
                    bottom: 30
                  }
                }
              }
            }
          });
        }, () => {
          console.log(error);
          // this.route.navigateByUrl('/admin/error-500');
        }
      );
    } else {
      // The alert message warning if the start date is later than end date
      this.message = 'Start date is later than end date';
      Swal.fire(
        'Please set start date is sooner than end date',
        '',
        'error'
      );
    }
    console.log('Array products name in x Axis after: ' + this.labelArr); // empty
    console.log('Array products finalPrice in y Axis: ' + this.dataArr); // empty
  }

  // This function want to get color for decorating work
  getRandomColor() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
      return color;
    }
  }

  checkDateDif(): { date_not_match: boolean } {
    if (this.datePipe.transform(this.statsBegin, 'yyyy-MM-dd') <= this.datePipe.transform(this.statsEnd, 'yyyy-MM-dd')) {
      return {date_not_match: true};
    }
  }
}

function getDataProduct(labelArr: any[], dataArr: any[], length: number, source: Product[]) {
  length = 0;
  source.forEach(val => {
    labelArr.push(val.nameProduct);
    console.log('name_product: ' + val.nameProduct);
    dataArr.push(val.finalPrice);
    length++;
  });
  console.log(length);
}


