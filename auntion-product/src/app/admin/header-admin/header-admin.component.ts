import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  /* Show navbar */
  isShowNavbar = false;

  constructor() { }

  ngOnInit(): void {
  }

  showNavbar() {
    this.isShowNavbar = !this.isShowNavbar;
  }
}
