import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../model/Product';
import {Member} from '../../model/Member';
import {Account} from '../../model/Account';
import {AuctionDTO} from '../../model/auctionDTO';
import {ImageProduct} from '../../model/ImageProduct';

@Injectable({
  providedIn: 'root'
})
export class AuctionProductService {

  constructor(private httpClient: HttpClient) { }

  /* HuyNN */
  getProductById(id: number) {
    return this.httpClient.get<Product>('http://localhost:8080/manager/product/api/getProductById/' + id);
  }

  getMemberById(id: number) {
    return this.httpClient.get<Member>('http://localhost:8080/getMemberById/' + id);
  }

  getAccountByMemberId(id: number) {
    return this.httpClient.get<Account>('http://localhost:8080/api/account/getAccountByMemberId/' + id);
  }

  getAuctionList(idProduct: number) {
    return this.httpClient.get<AuctionDTO[]>('http://localhost:8080/manager/product/api/getAuctionList/' + idProduct);
  }

  createNewAuction(idProduct: number, auction: AuctionDTO) {
    return this.httpClient.post<AuctionDTO>('http://localhost:8080/manager/product/api/createNewAuction/' + idProduct, auction);
  }

  getImageByProductId(idProduct: number) {
    return this.httpClient.get<ImageProduct[]>('http://localhost:8080/manager/product/api/getImageByProductId/' + idProduct);
  }
}
