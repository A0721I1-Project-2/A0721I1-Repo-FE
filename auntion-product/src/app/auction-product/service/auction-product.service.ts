import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Product} from '../../model/Product';
import {TypeProduct} from '../../model/TypeProduct';
const API_URL = 'http://localhost:8080/manager/product/api';
import {Member} from '../../model/Member';
import {Account} from '../../model/Account';
import {AuctionDTO} from '../../model/auctionDTO';
import {ImageProduct} from '../../model/ImageProduct';
import {Cart} from '../../model/Cart';

@Injectable({
  providedIn: 'root'
})
export class AuctionProductService {
  // tslint:disable-next-line:variable-name
  private _message: string;
  get message(): string {
    return this._message;
  }

  set message(value: string) {
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

  /* HuyNN */
  getProductById(id: number) {
    return this.httpClient.get<Product>('http://localhost:8080/manager/product/api/getProductById/' + id);
  }

  /* HuyNN */
  getMemberById(id: number) {
    return this.httpClient.get<Member>('http://localhost:8080/getMemberById/' + id);
  }

  /* HuyNN */
  getAuctionList(idProduct: number) {
    return this.httpClient.get<AuctionDTO[]>('http://localhost:8080/manager/product/api/getAuctionList/' + idProduct);
  }

  /* HuyNN */
  createNewAuction(idProduct: number, auction: AuctionDTO) {
    return this.httpClient.post<AuctionDTO>('http://localhost:8080/manager/product/api/createNewAuction/' + idProduct, auction);
  }

  /* HuyNN */
  getImageByProductId(idProduct: number) {
    return this.httpClient.get<ImageProduct[]>('http://localhost:8080/manager/product/api/getImageByProductId/' + idProduct);
  }

  /* HuyNN */
  addProductToCard(idMember: number, idProduct: number) {
    return this.httpClient.get<void>('http://localhost:8080/manager/product/api/addProductToCart/' + idMember + '/' + idProduct);
  }

  /* HuyNN */
  getCardByMemberId(id: number) {
    return this.httpClient.get<Cart>('http://localhost:8080/manager/product/api/getCartByMemberId/' + id);
  }

  /* HuyNN */
  sendPaymentEmail(email: string, nameProduct: string) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get('http://localhost:8080/manager/product/api/sendPaymentEmail/' + email + '/' + nameProduct);
  }
  updateCart(cart: Cart) {
    return this.httpClient.put('http://localhost:8080/manager/product/api/updateCart', cart);
  }
}
