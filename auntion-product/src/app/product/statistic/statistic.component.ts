import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Product} from '../../model/Product';
import {ProductService} from '../service/product.service';
import {error} from '@angular/compiler/src/util';
import {Router} from '@angular/router';
import {Chart} from 'chart.js';

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
              private route: Router) {
  }

  statsGroup: FormGroup;
  statsBeginDate: string;
  statsEndDate: string;
  products: Product[];
  labels: string[];
  data: number[];

  private locale;

  ngOnInit(): void {
    this.statsGroup = this.formBuilder.group({
      keyword: new FormControl(''),
      statsBegin: new FormControl('', Validators.required),
      statsEnd: new FormControl('', Validators.required)
    });
  }

  report() {
    this.statsBeginDate = this.statsGroup.get('statsBegin').value;
    this.statsEndDate = this.statsGroup.get('statsEnd').value;
    this.productService.statsProductFromDateToDate(this.statsBeginDate,
      this.statsEndDate).subscribe(items => {
        for (let i in items) {
          console.log('item: ' + items[i]);
          this.products.push(items[i]);
        }
        console.log('products:' + this.products);
      }, () => {
        console.log(error);
        this.route.navigateByUrl('/admin/error-500');
      }
    );
    this.getDataUser();
    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Revenues',
          data: this.data,
          backgroundColor: '#11b683'
        }]
      },
      options: {
        responsive: true,

      }
    });
  }

  transform(value: any, format?: string, timezone?: string, locale?: string): string | null;
  transform(value: any, ...args: any[]): any;
  transform(value: any, ...format: (any)[]): any {
  }

  getDataUser() {
    for (const i in this.products) {
      this.labels.push(this.products[i].nameProduct);
      console.log('name product:' + this.products[i].nameProduct);
      this.data.push(this.products[i].finalPrice);
    }
  }
}
