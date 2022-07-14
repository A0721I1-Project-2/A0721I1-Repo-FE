import {Component, OnChanges, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Member} from "../../../model/Member";
import {Account} from "../../../model/Account";
import {Observable} from "rxjs";
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-chat-box-user',
  templateUrl: './chat-box-user.component.html',
  styleUrls: ['./chat-box-user.component.css']
})
export class ChatBoxUserComponent implements OnInit , OnChanges {

  /* Get user */
  member: Member;
  account: Account;

  /* Get date now */
  now: any;

  /* Store message */
  messages: Observable<any>;
  messagesAdmin: Observable<any>;

  constructor(private apiService: ApiService , private chatService: ChatService) { }

  ngOnInit(): void {
    /* Get date now */
    this.now = new Date().toLocaleDateString();

    /* Get all message */
    this.messages = this.chatService.getMessages(2).valueChanges();
    this.messagesAdmin = this.chatService.getMessages(3).valueChanges();

    /* Get user */
    this.apiService.getMemberByAccountId(1).subscribe(member => {
      this.member = member;
    });

    /* Get account */
    this.apiService.getAccountByUsername('anhtuan').subscribe(account => {
      this.account = account;
    });
  }

  ngOnChanges(): void {
    this.messages = this.chatService.getMessages(2).valueChanges();
    this.messagesAdmin = this.chatService.getMessages(3).valueChanges();
  }
}
