import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
   urlSendEmai = 'http://localhost:8080/manager/invoice-status/api/sendMail';

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:variable-name
  public postImagePDFAndSendEmail(UrlImgInvoice: string): Observable<string> {
    return this.http.get<string>(this.urlSendEmai + '?img=' + UrlImgInvoice);
  }
}
