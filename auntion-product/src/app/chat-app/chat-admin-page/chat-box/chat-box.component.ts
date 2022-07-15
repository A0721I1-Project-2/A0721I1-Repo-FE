import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../services/api.service';
import {ChatService} from '../../services/chat.service';
import {Member} from "../../../model/Member";

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit, OnChanges {

  /* Get data from parent component*/
  @Input() userIdParent: any;

  /* Get info member */
  member: Member;

  /* Store message */
  messages: Observable<any>;

  constructor(private apiService: ApiService, private chatService: ChatService) {
  }

  ngOnInit(): void {
    /* Get all message */
    this.messages = this.chatService.getMessages(this.userIdParent).valueChanges();
  }

  ngOnChanges(): void {
    if(this.userIdParent) {
      /* Get member by account id */
      this.apiService.getMemberByAccountId(this.userIdParent).subscribe(data => {
        this.member = data;
      });

      this.messages = this.chatService.getMessages(this.userIdParent).valueChanges();
    }
  }
}
