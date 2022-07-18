import {Component, OnChanges, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Member} from "../../../model/Member";
import {Account} from "../../../model/Account";
import {Observable} from "rxjs";
import {ChatService} from "../../services/chat.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chat-box-user',
  templateUrl: './chat-box-user.component.html',
  styleUrls: ['./chat-box-user.component.css']
})
export class ChatBoxUserComponent implements OnInit , OnChanges {

  /* Get user */
  member: Member;
  user: any;

  /* Get date now */
  now: any;

  /* Store message */
  messages: Observable<any>;

  constructor(private apiService: ApiService , private chatService: ChatService
  ,private router: Router) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(window.localStorage.getItem('user'));

    /* Get date now */
    this.now = this.chatService.getTimeStamp();

    /* Get all message */
    this.messages = this.chatService.getMessages(this.user.id).valueChanges();

    /* Get user */
    this.apiService.getMemberByAccountId(this.user.id).subscribe(member => {
      this.member = member;
    });
  }

  ngOnChanges(): void {
    this.messages = this.chatService.getMessages(this.user.id).valueChanges();
  }
}
