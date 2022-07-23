import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
const API_URL = 'http://localhost:8080/manager/product/api';
@Injectable({
  providedIn: 'root'
})
export class ImgProductServiceService {

  createImgProduct(imgProduct?: any): Observable<any> {
    return this.httpClient.post(`${API_URL}/create-images` , imgProduct);
  }

  constructor(private httpClient: HttpClient) { }

}
