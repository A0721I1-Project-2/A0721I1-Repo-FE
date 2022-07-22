import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Product} from '../../model/Product';
import {TypeProduct} from '../../model/TypeProduct';

const API_URL = 'http://localhost:8080/manager/product/api';

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
  }
}
