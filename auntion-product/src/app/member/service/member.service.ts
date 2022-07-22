import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
    private http: HttpClient
  ) { }

  public checkId(id: string) {
    return this.http.get<void>(`${environment.API_GETWAY}/manager/member/api`, {
      params: {
        idPoster: id
      }
    })
  }
}
