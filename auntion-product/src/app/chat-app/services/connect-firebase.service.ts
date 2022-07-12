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
  quantityMsg = 0;

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
      statusL: status
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

  /* Set status for seen message */
  setStatusSeenMsg(userId: any, status: boolean, msgNew: string) {
    const path = `statusMsg/${userId}`;

    if (!status) {
      this.quantityMsg += 1;
    } else {
      this.quantityMsg = 0;
      msgNew = null;
    }

    const data = {
      userId: userId,
      statusMsg: status,
      quantity: this.quantityMsg,
      messageNew: msgNew
    }

    this.db.object(path).update(data).catch(error => console.log(error));
  }

  /* Get status and quantity message with user id*/
  getStatusMsg(userId): AngularFireObject<unknown> {
    const path = `statusMsg/${userId}`;

    return this.db.object(path);
  }

  constructor(private db: AngularFireDatabase) {
  }
}
