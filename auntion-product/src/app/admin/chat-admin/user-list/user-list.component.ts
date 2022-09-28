import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Account} from '../../../model/Account';
import {ApiService} from '../../../chat-app/services/api.service';
import {ConnectFirebaseService} from '../../../chat-app/services/connect-firebase.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  /* Share user id to parent component */
  @Output() userIdItem = new EventEmitter();

  /* Get all users */
  accounts: Account[];

  /* Get status msg */
  statusUsersMsg: any[] = [];

  constructor(private apiService: ApiService, private connectFirebaseService: ConnectFirebaseService) {
  }

  ngOnInit(): void {
    this.apiService.getAccountsByRoleMember().subscribe(accounts => {
      this.accounts = accounts;

      for (let i = 0; i < this.accounts.length; i++) {
        this.connectFirebaseService.getStatusMsg(this.accounts[i].idAccount).subscribe(statusMsg => {
          if (statusMsg) {
            const status = statusMsg;

            this.statusUsersMsg.push(status);

            /* Remove element duplicate */
            for (let j = 0; j < this.statusUsersMsg.length; j++) {
              /* Check for first message */
              if (this.statusUsersMsg.length > 1 &&
                this.statusUsersMsg[j].userId === this.statusUsersMsg[this.statusUsersMsg.length - 1].userId) {
                this.statusUsersMsg.splice(this.statusUsersMsg.length - 1, 1);
                this.statusUsersMsg[j] = statusMsg;
                break;
              }

              /* Check for rest message */
              if (this.statusUsersMsg.length > 1 &&
                this.statusUsersMsg[j + 1].userId === this.statusUsersMsg[this.statusUsersMsg.length - 1].userId) {
                this.statusUsersMsg.splice(this.statusUsersMsg.length - 1, 1);
                this.statusUsersMsg[j + 1] = statusMsg;
                break;
              }
            }
          }
        });
      }
    });
  }

  /* Seen message */
  seenMsg(userId: any) {
    this.userIdItem.emit(userId);
    this.connectFirebaseService.setSeenStatusMsg(userId, false, 0);
  }
}
