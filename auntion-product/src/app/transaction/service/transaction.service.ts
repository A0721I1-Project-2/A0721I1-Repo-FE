import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InvoiceDetail} from '../../model/InvoiceDetail';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8080/manager/api/';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getAllNotPagination(): Observable<InvoiceDetail[]> {
    return this.http.get<InvoiceDetail[]>(API_URL + 'transaction-list-notPagination');
  }

  getAll(index: number): Observable<InvoiceDetail[]> {
    return this.http.get<InvoiceDetail[]>(API_URL + 'transaction-list?index=' + index);
  }

  search(nameSeller: string, nameBuyer: string, nameProduct: string, status: boolean) {
    console.log(API_URL + 'search/' + nameSeller + '/' + nameBuyer + '/' + nameProduct + '?status=' + status);
    return this.http.get(API_URL + 'search/' + nameSeller + '/' + nameBuyer + '/' + nameProduct + '?status=' + status);
  }

  searchDate(startDate: string, endDate: string) {
    return this.http.get(API_URL + 'search-date/' + startDate + '/' + endDate);
  }

  delete(id: any) {
    return this.http.patch(API_URL + 'delete/' + id , {});
  }
}
