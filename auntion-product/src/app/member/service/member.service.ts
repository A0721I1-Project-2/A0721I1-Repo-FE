import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Address} from '../sign-up-member/address';
import {MemberDTO} from '../../model/MemberDTO';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Member} from '../../model/Member';
import {Rank} from '../../model/Rank';


const API_ADDRESS = 'http://localhost:3000/address';
const URL_API = 'http://localhost:8080/profile/';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  API_URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  /*// bin code */
  // tslint:disable-next-line:ban-types
  private alertMessage: String;
  message: string;

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
  findByIdAccount(idAccount: number): Observable<Member> {
    return this.httpClient.get<Member>(URL_API + 10);
  }

  // SonLT Edit-Member
  editMember(member: Member): Observable<void> {
    // @ts-ignore
    return this.httpClient.put(URL_API + '/edit/' + 10, member);
  }


}

