import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {map} from 'rxjs/operators';
import {TypeProduct} from '../../../model/TypeProduct';
import {BiddingStatus} from '../../../model/BiddingStatus';
import {ImageProduct} from '../../../model/ImageProduct';
import {Member} from '../../../model/Member';
import {Product} from '../../../model/Product';

const URL_API = 'http://localhost:8080/manager/product/api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) {
  }

  findById(id: any): Observable<Product> {
    return this.http.get<Product>(URL_API + '/getProductById/' + id);
  }

  findType(): Observable<TypeProduct[]> {
    return this.http.get<TypeProduct[]>(URL_API + '/type');
  }

  findImage(): Observable<ImageProduct[]> {
    return this.http.get<ImageProduct[]>(URL_API + '/img');
  }

  editProduct(product: Product): Observable<void> {
    return this.http.patch<void>(URL_API + '/edit', product);
  }

  findByIdMember(id: any): Observable<Member> {
    return this.http.get<Member>(URL_API + '/member/' + id);
  }


  public create(product): Observable<any> {
    return this.http.post<any>(`${URL_API}`, product);
  }

  getAllProduct(page: number): Observable<Product[]> {
    return this.http.get<Product[]>(URL_API + '/list?page=' + page);
  }

  getAllTypeProduct(): Observable<TypeProduct[]> {
    return this.http.get<TypeProduct[]>(URL_API + '/type');
  }

  getAllBiddingStatus(): Observable<BiddingStatus[]> {
    return this.http.get<BiddingStatus[]>(URL_API + '/list-bidding-status');
  }

  // HieuDV
  findByID(id: number): Observable<Product> {
    return this.http.get<Product>(`${URL_API}/product-detail?id=` + id);
  }

  // HieuDV
  searchByNameTypeSellerPriceStatus(name: string, typeProduct: number,
                                    sellerName: string, maxPrice: string,
                                    minPrice: string, biddingStatus: number,
                                    page: number): Observable<Product[]> {
    console.log(`${URL_API}/search/` + name + '/' + typeProduct + '/' + sellerName + '/' + maxPrice +
      '/' + minPrice + '/' + biddingStatus + '/' + page);
    return this.http.get<Product[]>(`${URL_API}/search/` + name + '/' + typeProduct + '/' + sellerName + '/' + maxPrice +
      '/' + minPrice + '/' + biddingStatus + '/' + page);
  }


  // HieuDV
  updateProduct(product): Observable<Product> {
    return this.http.put<Product>(URL_API + '/update-bidding-status', product);
  }

  // HieuDV
  delete(id: any) {
    return this.http.patch(URL_API + '/delete/' + id, {});
  }

  // BachLT
  statsProductFromDateToDate(startDay: any, endDay: any, biddingStatus: any): Observable<any> {
    return this.http.get(URL_API + '/statistic/' + startDay + '&' + endDay + '&' + biddingStatus).pipe(
      map(result => result));
  }

  // BachLT
  statsProductAtCurrentMonth(month: number, biddingStatus: any): Observable<any> {
    return this.http.get(URL_API + '/statistic/currentMonth&biddingStatus?currentMonth=' + month + '&biddingStatus=' + biddingStatus);
  }
}
