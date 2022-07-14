import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-chat-admin-home',
  templateUrl: './chat-admin-home.component.html',
  styleUrls: ['./chat-admin-home.component.css']
})
export class ChatAdminHomeComponent implements OnInit {

  userItemChild: any;

  constructor() { }

  ngOnInit(): void {

  }

  getUserFromChild(event: any) {
    this.userItemChild = event;
  }
}
