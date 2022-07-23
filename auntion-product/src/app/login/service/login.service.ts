import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Account} from '../../model/Account';
import {Observable} from 'rxjs';

const BASE_PATH = 'http://localhost:8080';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  isLoggedIn: boolean;
  isRole: number;

  readonly URL_LOGIN = 'http://localhost:8080/authenticate';

  constructor(private httpClient: HttpClient) {}

  get(): Observable<Account[]>{
    return this.httpClient.get<Account[]>(this.URL_LOGIN);
  }

  login(account: Account): Observable<Account>{
    return this.httpClient.post<Account>(this.URL_LOGIN, account);
  }


  /* Authenticate login */
  handleLogin(account: any): Observable<any> {
    return this.httpClient.post<any>(`${BASE_PATH}/authenticate` , account);
  }

  /* Logout */
  logout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }


}
