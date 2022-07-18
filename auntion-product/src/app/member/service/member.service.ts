import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Member} from '../../model/Member';


const URL_API = 'http://localhost:8080/member/profile/';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  message: string;

  constructor(private httpClient: HttpClient) {

  }

  // SonLT View-Member
  findByIdAccount(idAccount: number): Observable<Member>{
    return this.httpClient.get<Member>(URL_API + 10);
  }

  // SonLT Edit-Member
  editMember(member: Member): Observable<void> {
    // @ts-ignore
    return this.httpClient.put(URL_API + '/edit/' + 10 , member);
  }

}
