import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../model/Product';
import {Member} from '../../model/Member';
import {AuctionDTO} from '../../model/auctionDTO';
import {ImageProduct} from '../../model/ImageProduct';
import {Cart} from '../../model/Cart';

@Injectable({
  providedIn: 'root'
})
export class AuctionProductService {

  constructor(private httpClient: HttpClient) { }

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
