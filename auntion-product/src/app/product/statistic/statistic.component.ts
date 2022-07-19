import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Product} from '../../model/Product';
import {ProductService} from '../service/product.service';
import {error} from '@angular/compiler/src/util';
import {Router} from '@angular/router';
import {Chart} from 'chart.js';
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {


  // constructor(locale: string, private productService: ProductService) {
  //   super(locale);
  // }
  constructor(private productService: ProductService,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private route: Router) {
  }

  myChart: any;
  statsGroup: FormGroup;
  statsBeginDate: string;
  statsEndDate: string;
  products: any[] = [];
  labelArr: any[] = [];
  dataArr: any[] = [];
  defaultLabelArr: any[] = [];
  defaultDataArr: any[] = [];
  count: number;

  private locale;

  ngOnInit(): void {
    this.statsGroup = this.formBuilder.group({
      keyword: new FormControl(''),
      statsBegin: new FormControl('', Validators.required),
      statsEnd: new FormControl('', Validators.required)
    });
    const localDate = new Date(Date.now());
    console.log(localDate);
    const month = localDate.getMonth() + 1;
    console.log(month);
    this.productService.statsProductAtCurrentMonth(month, 1).subscribe(
      items => {
        for (const i in items) {
          console.log('item: ' + items[i]);
          this.products.push(items[i]);
        }
        // Asyns
        console.log('products:' + this.products);
        getDataProduct(this.defaultLabelArr, this.defaultDataArr, this.count, this.products);

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
                display: true
              },
              y: {
                beginAtZero: true,
                display: true
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
              }
            }
          }
        });

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
    this.statsBeginDate = this.statsGroup.get('statsBegin').value;
    this.statsEndDate = this.statsGroup.get('statsEnd').value;
    console.log(this.datePipe.transform(this.statsBeginDate, 'yyyy-MM-dd'));
    console.log(this.datePipe.transform(this.statsEndDate, 'yyyy-MM-dd'));
    // Chech if report too much times and the products get many duplicated values
    if (this.products.length > 0) {
      this.products = [];
    }
    this.productService.statsProductFromDateToDate(this.statsBeginDate,
      this.statsEndDate, 3).subscribe(items => {
        for (const i in items) {
          console.log('item: ' + items[i]);
          this.products.push(items[i]);
        }
        console.log('products:' + this.products);
        getDataProduct(this.labelArr, this.dataArr, this.count, this.products);
        console.log('Array products name in x Axis: ' + this.labelArr);
        console.log('Array products finalPrice in y Axis: ' + this.dataArr);
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
                display: true
              }
            }, plugins: {
              title: {
                display: true,
                text: 'Statistic Bar Chart From ' + this.statsBeginDate.toString() + ' to ' + this.statsEndDate.toString(),
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
        this.route.navigateByUrl('/admin/error-500');
      }
    );
    console.log('Array products name in x Axis after: ' + this.labelArr); // empty
    console.log('Array products finalPrice in y Axis: ' + this.dataArr); // empty
  }


  getRandomColor() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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


