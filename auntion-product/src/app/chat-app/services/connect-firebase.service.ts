import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ConnectFirebaseService {

  /* To store list users */
  users: AngularFireList<any>;

  /* Set data for user */
  setDataUser(userId: any, username: string, email: string, roles: any[], status: boolean) {
    const path = `users/${userId}`;

    const data = {
      username: username,
      email: email,
      roles: roles,
      status: status
    }

    this.db.object(path).update(data).catch(error => console.log(error));
  }

  /* Set status message */
  setStatusMsg(userId: any, status: boolean, quantity: number, msgNew: string) {
    const path = `statusMsg/${userId}`;

    if (status) {
      quantity += 1;
    } else {
      quantity = 0;
    }

    let member = null;
    this.apiService.getMemberByAccountId(userId).subscribe(data => {
      member = data.nameMember;

      let dataStatus = {
        userId: userId,
        statusMsg: status,
        nameMember: member,
        messageNew: msgNew,
        quantity: quantity
      };

      this.db.object(path).update(dataStatus).catch(error => console.log(error));
    })
  }

  /* Set status message when sent */
  setSeenStatusMsg(userId: any, status: boolean, quantity: number) {
    const path = `statusMsg/${userId}`;

    const dataStatus = {
      userId: userId,
      statusMsg: status,
      quantity: quantity
    }

    this.db.object(path).update(dataStatus).catch(error => console.log(error));
  }

  /* Get status and quantity message with user id*/
  getStatusMsg(userId): Observable<any> {
    const path = `statusMsg/${userId}`;

    return this.db.object(path).valueChanges();
  }

  /* Set status for account */
  setStatusForAccount(accountId: any, status: boolean) {
    const path = `users/${accountId}`;

    const data = {
      status: status
    }

    this.db.object(path).update(data).then(() => window.location.reload())
      .catch(error => console.log(error));
  }

  constructor(private db: AngularFireDatabase, private apiService: ApiService) {
  }
}
