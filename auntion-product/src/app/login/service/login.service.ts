import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Account} from '../../model/Account';
import {Observable} from 'rxjs';

const BASE_PATH = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /* Authenticate login */
  handleLogin(account: any): Observable<any> {
    return this.httpClient.post<any>(`${BASE_PATH}/authenticate` , account);
  }

  /* Logout */
  logout() {
    localStorage.clear();
  }

  constructor(private httpClient: HttpClient) { }
}
