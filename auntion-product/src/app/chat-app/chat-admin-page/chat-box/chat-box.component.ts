import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../services/api.service';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit, OnChanges {

  /* Get data from parent component*/
  @Input() userIdParent: any;

  /* Store message */
  messages: Observable<any>;

  /* Store message with rol admin */
  messagesAdmin: Observable<any>;

  constructor(private apiService: ApiService, private chatService: ChatService) {
    console.log(this.userIdParent)
  }

  ngOnInit(): void {
    /* Get all message */
    this.messages = this.chatService.getMessages(this.userIdParent).valueChanges();
    this.messagesAdmin = this.chatService.getMessages(3).valueChanges();
  }

  ngOnChanges(): void {
    console.log(this.userIdParent)
    this.messages = this.chatService.getMessages(this.userIdParent).valueChanges();
    this.messagesAdmin = this.chatService.getMessages(3).valueChanges();
  }
}
