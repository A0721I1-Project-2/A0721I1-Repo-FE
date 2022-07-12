import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {Observable} from "rxjs";

const BASE_PATH = "users";

@Injectable({
  providedIn: 'root'
})
export class ConnectFirebaseService {

  /* To store list users */
  users: AngularFireList<any>;

  /* Quantity message */
  quantityMsg: any;

  /* Get all users */
  getUsers() {
    const path = `${BASE_PATH}/`;
    this.users = this.db.list(path);
    return this.users.valueChanges();
  }

  /* Set data for user */
  setDataUser(userId: any, username: string, email: string, roles: any[], status: boolean) {
    const path = `${BASE_PATH}/${userId}`;

    const data = {
      username: username,
      email: email,
      roles: roles,
      status: status
    }

    this.db.object(path).update(data).catch(error => console.log(error));
  }

  /* Set status for user */
  setStatusForUser(userId: any, status: boolean) {
    const path = `${BASE_PATH}/${userId}`;

    const data = {
      status: status
    }

    this.db.object(path).update(data).catch(error => console.log(error));
  }

  /* Set status for new message */
  setNewMsgData(userId: any, msgNew: string) {
    const path = `statusMsg/${userId}`;
    /* Get user id */
    const dataStatus = {
      userId: userId,
      statusMsg: false,
      quantity: 1,
      messageNew: msgNew
    };

    this.db.object(path).update(dataStatus).catch(error => console.log(error));
  }

  /* Update quantity message */
  updateQuantityMsg(userId: any , quantity) {
    const path = `statusMsg/${userId}`;

    /* Get user id */
    const dataStatus = {
      quantity: quantity + 1
    };

    this.db.object(path).update(dataStatus).catch(error => console.log(error));
  }

  /* Set status message */
  setStatusMsg(userId: any, status: boolean , quantity: number) {
    const path = `statusMsg/${userId}`;

    if(status) {
      quantity += 1;
    }

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

  constructor(private db: AngularFireDatabase) {
  }
}
