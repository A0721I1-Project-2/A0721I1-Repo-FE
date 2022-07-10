import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

const BASE_PATH = "users";

@Injectable({
  providedIn: 'root'
})
export class ConnectFirebaseService {

  /* To store list users */
  users: AngularFireList<any>;

  /* Get all users */
  getUsers() {
    const path = 'users/';
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
  setStatusForUser(userId: any , status: boolean) {
    const path = `${BASE_PATH}/${userId}`;

    const data = {
      status: status
    }

    this.db.object(path).update(data).catch(error => console.log(error));
  }

  constructor(private db: AngularFireDatabase) { }
}
