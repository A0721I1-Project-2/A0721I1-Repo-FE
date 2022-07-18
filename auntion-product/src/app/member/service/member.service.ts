import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Member} from '../../model/Member';
import {Observable} from 'rxjs';
import {Address} from '../sign-up-member/address';
import {MemberDTO} from '../../model/MemberDTO';

const API_URL = `${environment.apiUrl}`;
const API_ADDRESS = 'http://localhost:3000/address';
@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private httpClient: HttpClient) {
  }
  // tslint:disable-next-line:ban-types
  private alertMessage: String;

  // tslint:disable-next-line:ban-types
  get messAlert(): String {
    return this.alertMessage;
  }
  getAddress(): Observable<Address[]>{
    return this.httpClient.get<Address[]>(API_ADDRESS);
  }

  addNewAccount(member: MemberDTO): Observable<MemberDTO> {
    return this.httpClient.post<MemberDTO>(API_URL + '/member/saveNewAccountMember', member);
  }
  checkUsername(username: string): Observable<Account[]> {
    return this.httpClient.get<Account[]>(API_URL + '/member/checkUsername?username=' + username);
  }

}

