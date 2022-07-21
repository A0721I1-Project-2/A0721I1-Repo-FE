import {Component, DoCheck, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  path = '';
  title = 'auntion-product';

  ngOnInit(): void {
    this.getPath();
  }

  getPath(){
    this.path = window.location.href;
    console.log(this.path);
  }

  ngDoCheck(): void {
    this.getPath();
  }
}
