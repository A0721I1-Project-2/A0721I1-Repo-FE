
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Address} from '../payment-cart/address';
import {Product} from '../../model/Product';
import {Member} from '../../model/Member';
import {Transport} from '../../model/Transport';
import {PaymentMethod} from '../../model/PaymentMethod';
import {Cart} from '../../model/Cart';
import {Payment} from '../../model/Payment';
const API_ADDRESS = 'http://localhost:3000/address';
const API_URL = 'http://localhost:8080/manager/payment/api/';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
   urlSendEmai = 'http://localhost:8080/manager/invoice-status/api/sendMail';

  constructor(private httpClient: HttpClient) { }
  // tslint:disable-next-line:variable-name
  public postImagePDFAndSendEmail(UrlImgInvoice: string): Observable<string> {
    return this.httpClient.get<string>(this.urlSendEmai + '?img=' + UrlImgInvoice);
  }
  getAddress(): Observable<Address[]>{
    return this.httpClient.get<Address[]>(API_ADDRESS);
  }
  getProduct( id: number): Observable<Product[]>{
    return this.httpClient.get<Product[]>(API_URL + 'getProduct/' + id);
  }
  getMember(id: number): Observable<Member>{
    return this.httpClient.get<Member>(API_URL + 'getMember/' + String(id));
  }
  getTransport(): Observable<Transport[]>{
    return this.httpClient.get<Transport[]>(API_URL + 'transport');
  }
  getPaymentMethod(): Observable<PaymentMethod[]>{
    return this.httpClient.get<PaymentMethod[]>(API_URL + 'payment-method');
  }
  getCart(id: number): Observable<Cart>{
    return this.httpClient.get<Cart>(API_URL + 'getCart/' + String(id));
  }
  createPayment(payment: Payment): Observable<string>{
    return this.httpClient.post<string>(API_URL + 'authorize_payment', payment);
  }
  savePayment(parse: any): Observable<Payment> {
    return this.httpClient.post<Payment>(API_URL + 'savePayment', parse);
  }
}
