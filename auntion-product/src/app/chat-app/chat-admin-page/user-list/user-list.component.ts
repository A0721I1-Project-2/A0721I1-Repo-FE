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

  constructor(private apiService: ApiService, private connectFirebaseService: ConnectFirebaseService) {
  }

  ngOnInit(): void {
    this.apiService.getAccountsByRoleMember().subscribe(data => {
      this.accounts = data;

      /* Set data user for firebase */
      for (let i = 0; i < this.accounts.length; i++) {
        this.apiService.getMemberByAccountId(this.accounts[i].idAccount).subscribe(member => {
          this.connectFirebaseService.setDataUser(this.accounts[i].idAccount, this.accounts[i].username, member.emailMember, this.accounts[i].roles, false);
        })
      }
    });
  }

}
