import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  URL_API = 'http://localhost:8080/manager/product/api';
  constructor(private httpClient: HttpClient) {
  }

  statsProductFromDateToDate(startDay: any, endDay: any): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.URL_API + '/statistic/' + startDay + '&' + endDay);
  }
}
