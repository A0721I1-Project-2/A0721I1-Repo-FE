import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Member} from "../../model/Member";
import {Account} from "../../model/Account";

const BASE_PATH_MEMBER = "http://localhost:8080/api/member";
const BASE_PATH_ACCOUNT = "http://localhost:8080/api/account";
const BASE_PATH = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /* Get all accounts */
  getAccounts(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(`${BASE_PATH_ACCOUNT}/list`);
  }

  /* Get all accounts by role member */
  getAccountsByRoleMember(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(`${BASE_PATH_ACCOUNT}/members`);
  }

  /* Get member by account id */
  getMemberByAccountId(accountId: number): Observable<Member> {
    return this.httpClient.get<Member>(`${BASE_PATH}/account=${accountId}`);
  }

  /* Get account by id */
  getAccountById(accountId: number): Observable<Account> {
    console.log(accountId);
    return this.httpClient.get<Account>(`${BASE_PATH_ACCOUNT}/account/id=${accountId}`);
  }

  /* Get account by username */
  getAccountByUsername(username: string): Observable<Account> {
    return this.httpClient.get<Account>(`${BASE_PATH_ACCOUNT}/username&${username}`);
  }

  constructor(private httpClient: HttpClient) { }
}
