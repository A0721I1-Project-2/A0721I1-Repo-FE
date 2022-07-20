import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../../model/Product';

const API_URL = 'http://localhost:8080/manager/product/api';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  //HieuDV
  getAll(page: number): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + '/list?page=' + page );
  }

  //HieuDV
  getAllNotPagination(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + '/list-not-pagination');
  }

  //HieuDV
  findByID(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/product-detail?id=` + id);
  }

  //HieuDV
  searchByNameTypeSellerPriceStatus(name: string, typeProduct: number,
                                    sellerName: string, maxPrice: number,
                                    minPrice: number, biddingStatus: number,
                                    page: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/search?name=` + name + '&sellerName=' + sellerName + '&maxPrice=' + maxPrice +
      '&minPrice=' + minPrice + '&biddingStatus=' + biddingStatus + '&page=' + page);
  }

  //HieuDV
  searchByNameTypeSellerPriceStatusNotPagination(name: string, typeProduct: number,
                                                 sellerName: string, maxPrice: number,
                                                 minPrice: number, biddingStatus: number,
                                                 page: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/search-not-pagination?name=` + name + '&sellerName=' + sellerName + '&maxPrice=' + maxPrice +
      '&minPrice=' + minPrice + '&biddingStatus=' + biddingStatus);
  }

  //HieuDV
  updateProduct(product): Observable<Product> {
    return this.http.post<Product>(API_URL + '/update-bidding-status', product);
  }

  //BachLT
  statsProductFromDateToDate(startDay: any, endDay: any): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + '/statistic/' + startDay + '&' + endDay);
  }
}
