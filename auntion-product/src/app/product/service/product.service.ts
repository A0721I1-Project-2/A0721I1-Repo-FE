import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../model/Product';
import {Observable} from 'rxjs';
import {TypeProduct} from '../../model/TypeProduct';
import {ImageProduct} from '../../model/ImageProduct';
import {Member} from "../../model/Member";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  URL_PRODUCT = 'http://localhost:8080/manager/product';
  constructor(
    private http: HttpClient,
  ) { }


  findById(id: any): Observable<Product>{
    return this.http.get<Product>(this.URL_PRODUCT + '/get/' + id );
  }

  findType(): Observable<TypeProduct[]> {
    return this.http.get<TypeProduct[]>(this.URL_PRODUCT + '/type');
  }

  findImage(): Observable<ImageProduct[]> {
    return this.http.get<ImageProduct[]>(this.URL_PRODUCT + '/img');
  }

  updateProduct(product: Product): Observable<void> {
    return this.http.patch<void>(this.URL_PRODUCT + '/edit', product);
  }
  findByIdMember(id: any): Observable<Member>{
    return this.http.get<Member>(this.URL_PRODUCT + '/member/' + id );
  }
}
