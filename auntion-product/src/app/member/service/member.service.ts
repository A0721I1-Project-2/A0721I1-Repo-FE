import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Member} from '../../model/Member';
import {Rank} from '../../model/Rank';

const URL_API = 'http://localhost:8080/profile/';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  message: string;

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

  // SonLT View-Member
  findByIdAccount(idAccount: number): Observable<Member>{
    return this.httpClient.get<Member>(URL_API + 10);
  }

  // SonLT Edit-Member
  editMember(member: Member): Observable<void> {

    return this.httpClient.put<void>(URL_API + '/edit' , member);
  }


}
