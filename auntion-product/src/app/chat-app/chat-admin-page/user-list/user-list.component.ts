import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Account} from "../../../model/Account";
import {ApiService} from "../../services/api.service";
import {ConnectFirebaseService} from "../../services/connect-firebase.service";
import {Member} from "../../../model/Member";
import {ChatService} from "../../services/chat.service";

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

  /* Get member */
  member: Member;

  /* Get status msg */
  statusUsersMsg: any[] = [];
  statusUserMsg: any;

  /* Store message */
  messages: any;

  constructor(private apiService: ApiService, private connectFirebaseService: ConnectFirebaseService
    , private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.apiService.getAccountsByRoleMember().subscribe(data => {
        this.accounts = data;

        /* Set data user for firebase */
        for (let i = 0; i < this.accounts.length; i++) {
          /* Get status msg by account id */
          this.connectFirebaseService.getStatusMsg(this.accounts[i].idAccount).subscribe(data => {
            if (data) {
              this.statusUserMsg = data;

              this.apiService.getMemberByAccountId(this.statusUserMsg.userId).subscribe(member=> {
                this.member = member;
              });
            }
          });

          /* Get member by account id */
          this.apiService.getMemberByAccountId(this.accounts[i].idAccount).subscribe(member => {
            this.connectFirebaseService.setDataUser(this.accounts[i].idAccount, this.accounts[i].username,
              member.emailMember, this.accounts[i].roles, false);
          });
        }
      }
    );
  }

  /* Seen message */
  seenMsg(userId: any) {
    this.userIdItem.emit(userId);
    this.connectFirebaseService.setSeenStatusMsg(userId, false, 0);
  }
}
