import {Component, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnChanges {
  title = 'auntion-product';

  isUser: boolean = false;

  constructor() {
    this.ngOnInit();
  }

  ngOnInit(): void {
    /* Check role */
    if (window.localStorage.getItem('user')) {
      this.isUser = true;
    } else {
      this.isUser = false;
    }
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }
}
