import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }

  private subject = new Subject<any>();

  sendClickEvent() {
    this.subject.next();
  }
  getClickEvent(): Observable<any>{
    return this.subject.asObservable();
  }
  // sign in with google
  // googleSignIn(){
  //   return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(() => {
  //       this.router.navigate(['/dashboard']);
  //       localStorage.setItem('token',JSON.stringify(res.user?.uid));
  //   }, err => {
  //     alert(err.message);
  //   });
  // }
}
