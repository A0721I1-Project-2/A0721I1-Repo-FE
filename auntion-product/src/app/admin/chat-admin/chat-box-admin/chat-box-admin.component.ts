import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Member} from '../../../model/Member';
import {Observable} from 'rxjs';
import {ApiService} from '../../../chat-app/services/api.service';
import {ChatService} from '../../../chat-app/services/chat.service';

@Component({
  selector: 'app-chat-box-admin',
  templateUrl: './chat-box-admin.component.html',
  styleUrls: ['./chat-box-admin.component.css']
})
export class ChatBoxAdminComponent implements OnInit , OnChanges {

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
    if (this.userIdParent) {
      /* Get member by account id */
      this.apiService.getMemberByAccountId(this.userIdParent).subscribe(data => {
        this.member = data;
      });

      this.messages = this.chatService.getMessages(this.userIdParent).valueChanges();
    }
  }
}
