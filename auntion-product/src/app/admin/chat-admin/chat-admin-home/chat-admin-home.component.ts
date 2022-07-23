import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-admin-home',
  templateUrl: './chat-admin-home.component.html',
  styleUrls: ['./chat-admin-home.component.css']
})
export class ChatAdminHomeComponent implements OnInit {

  userItemChild: any;

  constructor() { }

  ngOnInit(): void {
    const hideNavHp = document.querySelector('#header');
    const hideFooterHp = document.querySelector('.footer__container');
// @ts-ignore
// tslint:disable-next-line:no-unused-expression
    hideNavHp.style.display = 'none';
// @ts-ignore
// tslint:disable-next-line:no-unused-expression
    hideFooterHp.style.display = 'none';
  }

  getUserFromChild(event: any) {
    this.userItemChild = event;
  }
}
