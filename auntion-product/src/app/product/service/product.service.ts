import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../model/Product';
import {Observable} from 'rxjs';
import {TypeProduct} from '../../model/TypeProduct';
import {ImageProduct} from '../../model/ImageProduct';
import {Member} from '../../model/Member';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  URL_API = 'http://localhost:8080/manager/product/api';
  constructor(
    private httpClient: HttpClient,
  ) { }


  findById(id: any): Observable<Product>{
    return this.httpClient.get<Product>(this.URL_API + '/get/' + id );
  }

  findType(): Observable<TypeProduct[]> {
    return this.httpClient.get<TypeProduct[]>(this.URL_API + '/type');
  }

  findImage(): Observable<ImageProduct[]> {
    return this.httpClient.get<ImageProduct[]>(this.URL_API + '/img');
  }

  updateProduct(product: Product): Observable<void> {
    return this.httpClient.patch<void>(this.URL_API + '/edit', product);
  }
  findByIdMember(id: any): Observable<Member> {
    return this.httpClient.get<Member>(this.URL_API + '/member/' + id);
  }
  statsProductFromDateToDate(startDay: any, endDay: any): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.URL_API + '/statistic/' + startDay + '&' + endDay);
  }
}
