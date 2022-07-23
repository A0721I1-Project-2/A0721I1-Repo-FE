import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  URL_API = 'http://localhost:8080/manager/product/api';
  constructor(
    private httpClient: HttpClient,
  ) { }

  public create(product): Observable<any> {
    return this.httpClient.post<any>(`${environment.API_GETWAY}/manager/product/api`, product);
  }

  // statsProductFromDateToDate(startDay: any, endDay: any, biddingStatus: any): Observable<any> {
  //   return this.httpClient.get(this.URL_API + '/statistic/' + startDay + '&' + endDay + '&' + biddingStatus).pipe(
  //     map(result => result));
  // }
  statsProductFromDateToDate(startDay: any, endDay: any, biddingStatus: any): Observable<any> {
    return this.httpClient.get(this.URL_API + '/statistic/' + startDay + '&' + endDay + '&' + biddingStatus).pipe(
      map(result => result));
  }

  statsProductAtCurrentMonth(month: number, biddingStatus: any): Observable<any> {
    return this.httpClient.get(this.URL_API + '/statistic/currentMonth&biddingStatus?currentMonth=' + month + '&biddingStatus=' + biddingStatus);
  }
}
