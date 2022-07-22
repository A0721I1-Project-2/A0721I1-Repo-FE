
import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, DoCheck, OnChanges{
  path = '';
  title = 'auntion-product';
  isUser: boolean = false;
  
  constructor() {
    this.ngOnInit();
  }

  ngOnInit(): void {
    if (window.localStorage.getItem('user')) {
      this.isUser = true;
    } else {
      this.isUser = false;
    }
    this.getPath();
  }

  getPath(){
    this.path = window.location.href;
    console.log(this.path);
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }
  ngDoCheck(): void {
    this.getPath();

  }
}
