import {Injectable } from '@angular/core';
import {InvoiceDetail} from "../../model/InvoiceDetail";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Payment} from "../../model/Payment";

const API_URL = 'http://localhost:8080/manager/invoice-status/api';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {
  }
  findAllStatusInvoice(): Observable<InvoiceDetail[]> {
    return this.http.get<InvoiceDetail[]>(API_URL + '/status');
  }

  findPaymentById(id: number): Observable<Payment>{
    return this.http.get<Payment>(API_URL + "/getMember/" + id)
  }
}
