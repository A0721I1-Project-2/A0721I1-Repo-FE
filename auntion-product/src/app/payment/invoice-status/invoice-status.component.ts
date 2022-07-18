import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {InvoiceDetail} from "../../model/InvoiceDetail";
import {PaymentService} from "../service/payment.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-invoice-status',
  templateUrl: './invoice-status.component.html',
  styleUrls: ['./invoice-status.component.css']
})
export class InvoiceStatusComponent implements OnInit {
  private subscription: Subscription | undefined;
  invoice: InvoiceDetail[];

  constructor(
  private service: PaymentService,
  private router: Router,
) {
}
  ngOnInit(): void {
    this.findAllStatusInvoice();
    // console.log('check img',this.invoice)
  }
  findAllStatusInvoice() {
    this.service.findAllStatusInvoice().subscribe(
      (data) => {
        console.log(data);
        this.invoice = data;
        console.log('check',this.invoice);
      },
      () => {
      },
      () => {
      },
    );
  }

}
