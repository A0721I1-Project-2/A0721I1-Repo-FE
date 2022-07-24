import {Question} from '../../model/Question';
import {Topic} from 'src/app/model/Topic';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../model/Product';
import {ImageProduct} from '../../model/ImageProduct';
import {AuctionDTO} from '../../model/auctionDTO';

const URL_HOME_API = 'http://localhost:8080/manager/product/api';
const URL_ACCOUNT_API = 'http://localhost:8080/api/account';
const URL_INTRUCTION_API = 'http://localhost:8080/manager/api/question';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) {
  }

  // VinhTQ
  processForgotPasswordForm(username: string, email: string): Observable<string> {
    return this.httpClient.get<string>(URL_ACCOUNT_API + '/forgot-password?email=' + email + '&username=' + username);
  }

  // VinhTQ
  changePassword(password: string, token: string): Observable<string> {
    // @ts-ignore
    return this.httpClient.post<string>(URL_ACCOUNT_API + '/change-password?token=' + token + '&password=' + password, {}, {responseType: 'text'});
  }

  // VinhTQ
  checkAccount(username: string, email: string): Observable<Account> {
    return this.httpClient.get<Account>(URL_ACCOUNT_API + '/check-account?email=' + email + '&username=' + username);
  }

  // VinhTQ
  getProductByIdForProductDetail(id): Observable<Product> {
    return this.httpClient.get<Product>(URL_HOME_API + '/find-by-id/' + id);
  }

  // VinhTQ
  getImageByProductId(idProduct: number) {
    return this.httpClient.get<ImageProduct[]>(URL_HOME_API + '/getImageByProductId/' + idProduct);
  }

  // VinhTQ
  getAuctionList(idProduct: number) {
    return this.httpClient.get<AuctionDTO[]>(URL_HOME_API + '/getAuctionList/' + idProduct);
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
    return this.httpClient.get<Product[]>(URL_HOME_API + '/list/search' + '/name=' + nameProduct + '/type-product=' + typeProductname + '/' + min + '/' + max);
  }

  // HauLST
  searchListProductByPriceOver250(nameProduct: string, typeProductname: string, min: number) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Product[]>(URL_HOME_API + '/list/search' + '/name=' + nameProduct + '/type-product=' + typeProductname + '/' + min);
  }

  showListQuestion(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(URL_INTRUCTION_API + '/list');
  }

  listTopic(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(URL_INTRUCTION_API + '/topic');
  }
}
