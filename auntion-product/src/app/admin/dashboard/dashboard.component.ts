import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    const hideNavHp = document.querySelector('#header');
    const hideFooterHp = document.querySelector('.footer_container');
    // @ts-ignore
    // tslint:disable-next-line:no-unused-expression
    hideNavHp.style.display = 'none';
    // @ts-ignore
    // tslint:disable-next-line:no-unused-expression
    hideFooterHp.style.display = 'none';
  }

}
