// @ts-ignore
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Member} from '../../model/Member';
import {Observable} from 'rxjs';
import {Rank} from '../../model/Rank';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  API_URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  getMember(index: number): Observable<Member[]>{
    return this.httpClient.get<Member[]>(this.API_URL + '/allMember?page=' + index);
  }

  getRankMember(): Observable<Rank[]>{
    return this.httpClient.get<Rank[]>(this.API_URL + '/allRankMember');
  }

  searchMember(nameMember: string, emailMember: string, phoneNumberMember: string,
               nameRankMember: string, addressMember: string, index: number): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.API_URL + '/search/' + nameMember + '/' + emailMember + '/' + phoneNumberMember +
      '/' + nameRankMember + '/' + addressMember + '/' + '?page=' + index);
  }

  blockMember(blockList: number[]): Observable<Member[]> {
    return this.httpClient.post<Member[]>(this.API_URL + '/member/block', blockList);
  }

  unBlockMember(unBlockList: number[]): Observable<Member[]> {
    return this.httpClient.post<Member[]>(this.API_URL + '/member/unBlock', unBlockList);
  }

  deleteMember(deleteList: number[]): Observable<Member[]> {
    return this.httpClient.post<Member[]>(this.API_URL + '/member/delete', deleteList);
  }

  getAccount(): Observable<Account[]>{
    return this.httpClient.get<Account[]>(this.API_URL + '/getAccount');
  }
}
