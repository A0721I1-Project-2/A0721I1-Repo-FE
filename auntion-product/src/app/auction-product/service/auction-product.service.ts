<<<<<<< HEAD
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Product} from '../../model/Product';
import {TypeProduct} from '../../model/TypeProduct';

const API_URL = 'http://localhost:8080/manager/product/api';
=======
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../model/Product';
import {Member} from '../../model/Member';
import {Account} from '../../model/Account';
import {AuctionDTO} from '../../model/auctionDTO';
import {ImageProduct} from '../../model/ImageProduct';
>>>>>>> 52516eb1ca37b9e414e598bb404dfb0694fa3196

@Injectable({
  providedIn: 'root'
})
export class AuctionProductService {
  // tslint:disable-next-line:variable-name
    private _message: string;
    get message(): string {
      return this._message;
    }
    set message(value: string){
      this._message = value;
    }

<<<<<<< HEAD
  createProduct(product: any): Observable<Product> {

return this.httpClient.post<Product>(API_URL + '/postProduct', product);
  }

getAllTypeProduct(): Observable<TypeProduct[]> {
    return this.httpClient.get<TypeProduct[]>(API_URL + '/typeProduct');
  }

getTypeProductById(id: string): Observable<TypeProduct> {
    return this.httpClient.get<TypeProduct>(API_URL + '/typeProduct/' + id);
  }

constructor(private httpClient: HttpClient) {
=======
  constructor(private httpClient: HttpClient) { }

  /* HuyNN */
  getProductById(id: number) {
    return this.httpClient.get<Product>('http://localhost:8080/manager/product/api/getProductById/' + id);
  }

  getMemberById(id: number) {
    return this.httpClient.get<Member>('http://localhost:8080/getMemberById/' + id);
  }

  getAccountByMemberId(id: number) {
    return this.httpClient.get<Account>('http://localhost:8080/api/account/getAccountByMemberId/' + id);
  }

  getAuctionList(idProduct: number) {
    return this.httpClient.get<AuctionDTO[]>('http://localhost:8080/manager/product/api/getAuctionList/' + idProduct);
  }

  createNewAuction(idProduct: number, auction: AuctionDTO) {
    return this.httpClient.post<AuctionDTO>('http://localhost:8080/manager/product/api/createNewAuction/' + idProduct, auction);
  }

  getImageByProductId(idProduct: number) {
    return this.httpClient.get<ImageProduct[]>('http://localhost:8080/manager/product/api/getImageByProductId/' + idProduct);
>>>>>>> 52516eb1ca37b9e414e598bb404dfb0694fa3196
  }
}
