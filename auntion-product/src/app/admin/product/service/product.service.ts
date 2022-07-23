import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../../model/Product';
import {min} from 'rxjs/operators';
import {TypeProduct} from '../../../model/TypeProduct';
import {BiddingStatus} from '../../../model/BiddingStatus';

const API_URL = 'http://localhost:8080/manager/product/api';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

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

  //BachLT
  statsProductFromDateToDate(startDay: any, endDay: any): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + '/statistic/' + startDay + '&' + endDay);
  }
}
