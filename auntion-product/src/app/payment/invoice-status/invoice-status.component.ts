import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {InvoiceDetail} from "../../model/InvoiceDetail";
import {PaymentService} from "../service/payment.service";
import {Router} from '@angular/router';
import {Payment} from "../../model/Payment";
import {Address} from './address';
import {Districts} from './districts';
import {Ward} from './ward';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-invoice-status',
  templateUrl: './invoice-status.component.html',
  styleUrls: ['./invoice-status.component.css']
})
export class InvoiceStatusComponent implements OnInit {
  private subscription: Subscription | undefined;
  invoice: InvoiceDetail[];
  payment: Payment;
  total: number = 0;
  feeTransport: number;
  invoiceDetail: any;
  PaymentMethod: any;

  // address = '82 Nguyen Luong Bang, quan Lien Chieu, phuong Hoa Khanh, Da Nang';
  street: string;
  ward: string;
  district: string;
  city: string;
  item = 0;
  address: string;
  today: Date;

  constructor(
    private service: PaymentService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.findAllStatusInvoice();
    // console.log('check img',this.invoice)
    this.today=new Date();


  }

  findAllStatusInvoice() {
    this.service.findAllStatusInvoice().subscribe(
      (data) => {
        console.log(data);
        this.invoice = data;

        this.address = data[0].invoice.payment.addressReceiver;
        this.feeTransport = data[0].invoice.payment.transport.feeTransport;
        this.invoiceDetail = data[0].invoice.payment;
        // this.PaymentMethod = data[0].
        console.log(this.invoice);
        for (let i = 0; i < data.length; i++) {
          this.total += data[i].product.finalPrice;
          console.log(this.total)


        }
        console.log('check', this.invoice);
        this.getst();
      },
      () => {
      },
      () => {
      },
    );
  }

  getst() {
    console.log(this.address);
    // console.log(this.item.invoice.payment.addressReceiver);
    for (let i = 0; i < this.address.length; i++) {
      if (this.address[i] ==',') {
        this.street = this.address.substring(0, i);
        for (let j = i + 2; j < this.address.length; j++) {
          if (this.address[j] == ',') {
            this.ward = this.address.substring(i + 2, j);
            for (let m = j + 2; m < this.address.length; m++) {
              if (this.address[m] == ',') {
                this.district = this.address.substring(j + 2, m);
                this.city = this.address.substring(m + 2);
                break;
              }
            }
            break;
          }
        }
        break;
      }
    }
    console.log(this.street);
    console.log(this.ward);
    console.log(this.district);
    console.log(this.city);
  }
}
