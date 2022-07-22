import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) { }

  public create(product): Observable<any> {
    return this.http.post<any>(`${environment.API_GETWAY}/manager/product/api`, product);
  }
}
