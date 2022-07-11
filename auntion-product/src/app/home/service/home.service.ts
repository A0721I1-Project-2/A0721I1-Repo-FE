import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../model/Product';

const URL_HOME_API = 'http://localhost:8080/manager/product/api';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) {
  }

  // HauLST
  showListProductAuction(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(URL_HOME_API + '/list/auction');
  }

  // HauLST
  showListProductFinished(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(URL_HOME_API + '/list/finished-auction');
  }

  // HauLST
  sortListProductByTypeProduct(typeProductName: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(URL_HOME_API + '/list/auction/' + typeProductName);
  }

  // HauLST
  searchListProduct(nameProduct: string, typeProductname: string, min: number, max: number) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Product[]>(URL_HOME_API + '/list/search/' + '/name=' + nameProduct + '/type-product=' + typeProductname + '/' + min + '/' + max);
  }

  // HauLST
  searchListProductByPriceOver250(nameProduct: string, typeProductname: string, min: number) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Product[]>(URL_HOME_API + '/list/search' + '/name=' + nameProduct + '/type-product=' + typeProductname + '/' + min);
  }
}
