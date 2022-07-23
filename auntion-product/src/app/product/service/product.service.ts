import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators';
import {TypeProduct} from '../../model/TypeProduct';
import {BiddingStatus} from '../../model/BiddingStatus';
import {Product} from '../../model/Product';

const API_URL = 'http://localhost:8080/manager/product/api';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  URL_API = 'http://localhost:8080/manager/product/api';


  constructor(private http: HttpClient) {}

  public create(product): Observable<any> {
    return this.http.post<any>(`${environment.API_GETWAY}/manager/product/api`, product);
  }

  //HieuDV
  getAllProduct(page: number): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + '/list?page=' + page );
  }

  getAllTypeProduct(): Observable<TypeProduct[]> {
    return this.http.get<TypeProduct[]>(API_URL + '/type');
  }

  getAllBiddingStatus(): Observable<BiddingStatus[]> {
    return this.http.get<BiddingStatus[]>(API_URL + '/list-bidding-status');
  }

  //HieuDV
  findByID(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/product-detail?id=` + id);
  }

  //HieuDV
  searchByNameTypeSellerPriceStatus(name: string, typeProduct: number,
                                    sellerName: string, maxPrice: string,
                                    minPrice: string, biddingStatus: number,
                                    page: number): Observable<Product[]> {
    console.log(`${API_URL}/search/` + name + '/' +typeProduct+ '/' + sellerName + '/' + maxPrice +
      '/' + minPrice + '/' + biddingStatus + '/' + page);
    return this.http.get<Product[]>(`${API_URL}/search/` + name + '/' +typeProduct+ '/' + sellerName + '/' + maxPrice +
      '/' + minPrice + '/' + biddingStatus + '/' + page);
  }


  //HieuDV
  updateProduct(product): Observable<Product> {
    return this.http.put<Product>(API_URL + '/update-bidding-status', product);
  }

  //HieuDV
  delete(id: any) {
    return this.http.patch(API_URL + '/delete/' + id , {});
  }
  //BachLT
  statsProductFromDateToDate(startDay: any, endDay: any, biddingStatus: any): Observable<any> {
    return this.http.get(this.URL_API + '/statistic/' + startDay + '&' + endDay + '&' + biddingStatus).pipe(
      map(result => result));
  }

  //BachLT
  statsProductAtCurrentMonth(month: number, biddingStatus: any): Observable<any> {
    return this.http.get(this.URL_API + '/statistic/currentMonth&biddingStatus?currentMonth=' + month + '&biddingStatus=' + biddingStatus);
  }
}
