import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../model/Product';

@Injectable({
  providedIn: 'root'
})
export class AuctionProductService {

  constructor(private httpClient: HttpClient) { }

  /* HuyNN getProductById */
  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>('http://localhost:8080/manager/product/api/' + id);
  }
}
