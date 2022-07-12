import {Component, OnInit} from '@angular/core';
import {Account} from "../../../model/Account";
import {ApiService} from "../../services/api.service";
import {ConnectFirebaseService} from "../../services/connect-firebase.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  /* Get all users */
  accounts: Account[];

  /* Get status msg */
  statusUserMsg: any[] = [];

  constructor(private apiService: ApiService, private connectFirebaseService: ConnectFirebaseService) {
  }

  ngOnInit(): void {
    this.apiService.getAccountsByRoleMember().subscribe(data => {
      this.accounts = data;

      /* Set data user for firebase */
      for (let i = 0; i < this.accounts.length; i++) {
        /* Get status msg by account id */
        this.connectFirebaseService.getStatusMsg(this.accounts[i].idAccount).subscribe(statusMsg => {
          if (statusMsg) {
            this.statusUserMsg.push(statusMsg);
          }
        });

        /* Get member by account id */
        this.apiService.getMemberByAccountId(this.accounts[i].idAccount).subscribe(member => {
          this.connectFirebaseService.setDataUser(this.accounts[i].idAccount, this.accounts[i].username, member.emailMember, this.accounts[i].roles, false);
        });
      }
    });
  }

  /* Seen message */
  seenMsg(userId: any) {
    this.connectFirebaseService.setStatusMsg(userId, true);
  }
}
