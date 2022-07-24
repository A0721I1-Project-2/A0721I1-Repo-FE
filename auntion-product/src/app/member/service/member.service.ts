import { Account } from './../../model/Account';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../sign-up-member/address';
import { MemberDTO } from '../../model/MemberDTO';
import { Member } from '../../model/Member';
import { Rank } from '../../model/Rank';


const API_ADDRESS = 'http://localhost:3000/address';
const URL_API_MEM = 'http://localhost:8080/profile/';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  public URL_API_DETAIL = 'http://localhost:8080/api/account';
  API_URL = 'http://localhost:8080';
  private alertMessage: String;
  message: string;

  constructor(
    private httpClient: HttpClient
  ) { }

  public checkId(id: string) {
    return this.httpClient.get<void>(`${environment.API_GETWAY}/getMemberById/`+id
    )
  }

  // HauNT
  findByIdUser(idUser: number): Observable<Member> {
    // @ts-ignore
    return this.httpClient.get(this.URL_API_DETAIL + '/detail/' + idUser);
  }

  // tslint:disable-next-line:ban-types
  get messAlert(): String {
    return this.alertMessage;
  }

  /*bin code*/
  getAddress(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(API_ADDRESS);
  }


  /*bin code*/
  addNewAccount(member: MemberDTO): Observable<MemberDTO> {
    return this.httpClient.post<MemberDTO>(this.API_URL + '/member/saveNewAccountMember', member);
  }

  /*bin code*/
  checkUsername(username: string): Observable<Account[]> {
    return this.httpClient.get<Account[]>(this.API_URL + '/member/checkUsername?username=' + username);
  }


  getMember(index: number): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.API_URL + '/allMember?page=' + index);
  }

  getRankMember(): Observable<Rank[]> {
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

  getAccount(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(this.API_URL + '/getAccount');
  }


  // SonLT View-Member
  findByIdAccount(member: any): Observable<Member> {
    return this.httpClient.get<Member>(this.API_URL + '/profile/' + member);
  }

  // SonLT Edit-Member
  editMember(member: Member): Observable<Member> {
    return this.httpClient.patch<Member>(URL_API_MEM + 'edit' , member);
  }
}
