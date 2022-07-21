import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Member} from '../../model/Member';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  public URL_API = 'http://localhost:8080/manager/api/member';

  constructor(private httpClient: HttpClient) {
  }

  // HauNT
  findByIdUser(idUser: number): Observable<Member> {
    // @ts-ignore
    return this.httpClient.get(this.URL_API + '/detail/' + idUser);
  }
}
