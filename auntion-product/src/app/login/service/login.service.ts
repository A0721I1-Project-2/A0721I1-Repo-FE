import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../../model/Account';

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

}
