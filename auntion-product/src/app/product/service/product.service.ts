import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../model/Product';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  URL_API = 'http://localhost:8080/manager/product/api';

  constructor(private httpClient: HttpClient) {
  }

  statsProductFromDateToDate(startDay: any, endDay: any, biddingStatus: any): Observable<any> {
    return this.httpClient.get(this.URL_API + '/statistic/' + startDay + '&' + endDay + '&' + biddingStatus).pipe(
      map(result => result));
  }

  statsProductAtCurrentMonth(month: number, biddingStatus: any): Observable<any> {
    return this.httpClient.get(this.URL_API + '/statistic/currentMonth&biddingStatus?currentMonth=' + month + '&biddingStatus=' + biddingStatus);
  }
}
