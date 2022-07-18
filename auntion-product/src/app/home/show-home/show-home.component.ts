import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../../payment/service/payment.service';

@Component({
  selector: 'app-show-home',
  templateUrl: './show-home.component.html',
  styleUrls: ['./show-home.component.css']
})
export class ShowHomeComponent implements OnInit {

  messagePayment: string;
  constructor(
    private servicePayment: PaymentService
  ) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('message'));
    this.messagePayment = sessionStorage.getItem('message');
    this.servicePayment.savePayment(JSON.parse(sessionStorage.getItem('testObject'))).subscribe(data => {
      console.log('ok');
      this.messagePayment = sessionStorage.getItem('message');
      sessionStorage.removeItem('testObject');
      console.log(this.messagePayment);
    }, error => {
      console.log('err');
    });
    // sessionStorage.removeItem('message');
  }

}
